# moleculer-docgen
Documentation generator for Moleculer services

## How does it work?
1. Write a template. Check `templates` folder. The template is written using [`handlebarsjs`](https://handlebarsjs.com/)
2. Run `node index.js -t templates/README.db.md -s services/db.service.js -d out/README.db.md`, where `-t` indicates the name and the location of the template, `-s` indicates the location of the service and `-d` indicates the name of the output file.
3. Done. Check the output file.