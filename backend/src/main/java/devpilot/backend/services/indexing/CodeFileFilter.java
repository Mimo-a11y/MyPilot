package devpilot.backend.services.indexing;

import java.util.Locale;
import java.util.Set;

import org.springframework.stereotype.Component;

@Component
public class CodeFileFilter {
    private static final Set<String> SKIP_DIR_PARTS = Set.of(
        // Version control and IDEs
        "node_modules",
        ".git",
        ".idea",
        ".vscode",

        // Build outputs
        "dist",
        "build",
        "target",
        "out",
        ".next",
        ".nuxt",
        ".output",
        ".turbo",
        ".angular",

        // Dependencies and package environments
        "vendor",
        ".venv",
        "venv",
        "__pycache__",
        ".tox",
        ".gradle",
        "Pods",

        // Testing and coverage
        "coverage",
        ".pytest_cache",
        ".mypy_cache",
        ".ruff_cache",
        "playwright-report",
        "test-results",

        // Infrastructure and generated files
        ".terraform",
        "storybook-static"
);

    private static final Set<String> ALLOWED_EXTENSIONS = Set.of(
            // JVM
            "java", "kt", "kts", "scala",

            // JavaScript / TypeScript
            "ts", "tsx", "js", "jsx", "mjs", "cjs",
            "vue", "svelte", "astro",

            // Backend languages
            "py", "go", "rs", "rb", "php",
            "c", "h", "cpp", "hpp", "cs",
            "swift", "m", "mm",

            // Additional languages
            "r", "rmd", "jl",
            "ex", "exs", "erl", "hrl",
            "hs", "lhs",
            "clj", "cljs", "cljc",
            "pl", "pm", "lua", "dart", "sol",
            "elm",

            // Jupyter / data science
            "ipynb",
            "csv", "tsv",

            // Documentation
            "md", "mdx", "txt",
            "rst", "adoc", "org",

            // Configuration
            "yml", "yaml", "json", "toml", "xml",
            "properties", "ini", "cfg", "conf",

            // Infrastructure as Code
            "tf", "tfvars", "hcl",

            // Database
            "sql",

            // API definitions
            "graphql", "gql", "proto",

            // Shell and build
            "sh", "bash", "zsh",
            "gradle",

            // Frontend
            "html", "css", "scss", "sass", "less"
    );

    private static final Set<String> SKIP_FILENAMES = Set.of(
            // Package lockfiles
            "package-lock.json",
            "yarn.lock",
            "pnpm-lock.yaml",
            "bun.lock",
            "bun.lockb",
            "composer.lock",
            "cargo.lock",
            "poetry.lock",
            "uv.lock",
            "pipfile.lock",
            "gemfile.lock",

            // Sensitive environment files
            ".env",
            ".env.local",
            ".env.development",
            ".env.production",
            ".env.test"
    );

    public boolean isEligible(String path, long sizeBytes, long maxFileBytes) {
        if (path == null || path.isBlank()) {
            return false;
        }
        String normalized = path.replace('\\', '/');
        String lower = normalized.toLowerCase(Locale.ROOT);

        for (String part : lower.split("/")) {
            if (SKIP_DIR_PARTS.contains(part)) {
                return false;
            }
        }

        String fileName = lower.substring(lower.lastIndexOf('/') + 1);
        if (SKIP_FILENAMES.contains(fileName)) {
            return false;
        }
        if (fileName.startsWith(".")) {
            return false;
        }
        if (sizeBytes > maxFileBytes) {
            return false;
        }

        if ("dockerfile".equals(fileName) || "makefile".equals(fileName)) {
            return true;
        }

        int dot = fileName.lastIndexOf('.');
        if (dot < 0) {
            return false;
        }
        String ext = fileName.substring(dot + 1);
        return ALLOWED_EXTENSIONS.contains(ext);
    }

 public String detectLanguage(String path) {
        String lower = path.toLowerCase(Locale.ROOT);
        String fileName = lower.substring(lower.lastIndexOf('/') + 1);
        if ("dockerfile".equals(fileName)) {
            return "dockerfile";
        }
        if ("makefile".equals(fileName)) {
            return "makefile";
        }
        int dot = fileName.lastIndexOf('.');
        if (dot < 0) {
            return "text";
        }
        return fileName.substring(dot + 1);
    }
}