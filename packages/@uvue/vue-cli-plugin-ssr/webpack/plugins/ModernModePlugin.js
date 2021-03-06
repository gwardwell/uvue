const fs = require('fs-extra');
const path = require('path');

// https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc
const safariFix = `!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()},!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();`;

class ModernModePlugin {
  constructor({ targetDir, isModernBuild }) {
    this.targetDir = targetDir;
    this.isModernBuild = isModernBuild;
  }

  apply(compiler) {
    if (!this.isModernBuild) {
      this.applyLegacy(compiler);
    } else {
      this.applyModern(compiler);
    }
  }

  applyLegacy(compiler) {
    const ID = `vue-cli-legacy-bundle`;
    compiler.hooks.compilation.tap(ID, compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(ID, async (data, cb) => {
        // UVue modification: only for SPA template //////////////////
        const htmlPath = path.dirname(data.plugin.options.filename);
        const htmlName = path.basename(data.plugin.options.filename);
        if (htmlName !== 'spa.html') {
          return cb();
        }
        // Uvue //////////////////////////////////////////////////////

        // get stats, write to disk
        await fs.ensureDir(this.targetDir);
        const tempFilename = path.join(this.targetDir, htmlPath, `legacy-assets-${htmlName}.json`);
        await fs.mkdirp(path.dirname(tempFilename));
        await fs.writeFile(tempFilename, JSON.stringify(data.body));
        cb();
      });
    });
  }

  applyModern(compiler) {
    const ID = `vue-cli-modern-bundle`;
    compiler.hooks.compilation.tap(ID, compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(ID, async (data, cb) => {
        // UVue modification: only for SPA template //////////////////
        const htmlPath = path.dirname(data.plugin.options.filename);
        const htmlName = path.basename(data.plugin.options.filename);
        if (htmlName !== 'spa.html') {
          return cb();
        }
        // Uvue //////////////////////////////////////////////////////

        // use <script type="module"> for modern assets
        data.body.forEach(tag => {
          if (tag.tagName === 'script' && tag.attributes) {
            tag.attributes.type = 'module';
          }
        });

        // use <link rel="modulepreload"> instead of <link rel="preload">
        // for modern assets
        data.head.forEach(tag => {
          if (
            tag.tagName === 'link' &&
            tag.attributes.rel === 'preload' &&
            tag.attributes.as === 'script'
          ) {
            tag.attributes.rel = 'modulepreload';
          }
        });

        // inject Safari 10 nomodule fix
        data.body.push({
          tagName: 'script',
          closeTag: true,
          innerHTML: safariFix,
        });

        // Watch out for output files in sub directories
        const tempFilename = path.join(this.targetDir, htmlPath, `legacy-assets-${htmlName}.json`);
        const legacyAssets = JSON.parse(await fs.readFile(tempFilename, 'utf-8')).filter(
          a => a.tagName === 'script' && a.attributes,
        );
        legacyAssets.forEach(a => {
          a.attributes.nomodule = '';
        });
        data.body.push(...legacyAssets);
        await fs.remove(tempFilename);
        cb();
      });

      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(ID, data => {
        data.html = data.html.replace(/\snomodule="">/g, ' nomodule>');
      });
    });
  }
}

ModernModePlugin.safariFix = safariFix;
module.exports = ModernModePlugin;
