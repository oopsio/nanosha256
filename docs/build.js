const { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } = require("fs");
const { join, basename } = require("path");
const { marked } = require("marked");
const swcHtml = require("@swc/html");

const contentDir = join(__dirname, "content");
const distDir = join(__dirname, "dist");

if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
}

async function build() {
    try {
        const order = ["index.md", "api.md", "security.md"];
        let files = readdirSync(contentDir).filter(f => f.endsWith(".md"));
        
        // Sort files
        const sortedFiles = [];
        for (const name of order) {
            if (files.includes(name)) {
                sortedFiles.push(join(contentDir, name));
                files = files.filter(f => f !== name);
            }
        }
        sortedFiles.push(...files.map(f => join(contentDir, f)));

        console.log(`Building and minifying documentation into ${distDir}...`);

        let fullMd = "# nanosha256 - Technical Manual\n\n> Generated on: " + new Date().toISOString().split('T')[0] + "\n\n---\n\n";

        for (const file of sortedFiles) {
            const name = basename(file);
            console.log(`  Processing ${name}...`);
            fullMd += `<!-- Start of ${name} -->\n\n`;
            fullMd += readFileSync(file, "utf8");
            fullMd += "\n\n---\n\n";
        }

        // Save manual.md
        writeFileSync(join(distDir, "manual.md"), fullMd);
        console.log(`  Generated manual.md`);

        // Render HTML - Ensuring we await for consistency even if sync
        const htmlContentRaw = await marked.parse(fullMd);

        const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>nanosha256 Documentation</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 900px; margin: 40px auto; padding: 0 20px; background: #fdfdfd; }
        h1, h2, h3 { color: #1a1a1a; margin-top: 40px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        pre { background: #f4f4f4; border-radius: 5px; padding: 15px; overflow-x: auto; border-left: 5px solid #007acc; font-family: 'Consolas', 'Monaco', monospace; }
        code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; font-family: 'Consolas', 'Monaco', monospace; }
        blockquote { margin: 20px 0; padding: 10px 20px; background: #fffdf0; border-left: 5px solid #e6db74; color: #666; font-style: italic; }
        hr { border: 0; height: 1px; background: #eee; margin: 40px 0; }
        ul { padding-left: 20px; }
        li { margin-bottom: 5px; }
        a { color: #007acc; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div id="content">${htmlContentRaw}</div>
</body>
</html>`;

        // Minify with SWC - More aggressive whitespace collapsing
        console.log(`  Minifying with @swc/html...`);
        const { code: minifiedHtml } = await swcHtml.minify(Buffer.from(htmlTemplate), {
            collapseWhitespaces: "all",
            removeComments: true,
            minifyCss: true
        });

        writeFileSync(join(distDir, "index.html"), minifiedHtml);
        console.log(`  Generated minified index.html`);
    } catch (err) {
        console.error("Build failed:", err);
    }
}

build();
