
package devpilot.backend.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;

import org.springframework.ai.embedding.Embedding;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.embedding.EmbeddingRequest;
import org.springframework.ai.embedding.EmbeddingResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.ai.document.Document;

@Component
public class CloudflareEmbeddingModel implements EmbeddingModel {

    private final RestClient restClient;
    private final String model;

    public CloudflareEmbeddingModel(
            RestClient.Builder restClientBuilder,
            @Value("${spring.ai.openai.base-url}") String baseUrl,
            @Value("${spring.ai.openai.api-key}") String apiKey,
            @Value("${cloudflare.embedding.model:@cf/baai/bge-base-en-v1.5}") String model) {

        this.restClient = restClientBuilder
                .baseUrl(baseUrl)
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .build();

        this.model = model;
    }

    
    @Override
    public EmbeddingResponse call(EmbeddingRequest request) {

        // 1. Get the input text
        List<String> inputs = request.getInstructions();

        // 2. Send the request to Cloudflare
        Map<String, Object> response = restClient.post()
                .uri("/embeddings")
                .body(Map.of(
                        "model", model,
                        "input", inputs
                ))
                .retrieve()
                .body(new ParameterizedTypeReference<Map<String, Object>>() {});

        if (response == null || !(response.get("data") instanceof List<?> data)) {
            throw new IllegalStateException(
                    "Invalid embedding response from Cloudflare");
        }

        // 3. Extract embedding vectors
        List<Embedding> embeddings = new ArrayList<>();

        for (Object item : data) {

            if (!(item instanceof Map<?, ?> itemMap)
                    || !(itemMap.get("embedding") instanceof List<?> vector)) {
                throw new IllegalStateException(
                        "Invalid embedding data returned by Cloudflare");
            }

            float[] output = new float[vector.size()];

            for (int i = 0; i < vector.size(); i++) {
                if (!(vector.get(i) instanceof Number number)) {
                    throw new IllegalStateException(
                            "Invalid embedding value returned by Cloudflare");
                }

                output[i] = number.floatValue();
            }

            int index = itemMap.get("index") instanceof Number number
                    ? number.intValue()
                    : embeddings.size();

            embeddings.add(new Embedding(output, index));
        }

        // 4. Return Spring AI's expected response
        return new EmbeddingResponse(embeddings);
    }


    @Override
    public int dimensions() {
        return 768;
    }

    @Override
    public float[] embed(Document document) {
        return embed(document.getText());
    }
}

