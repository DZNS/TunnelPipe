# TunnelPipe
---
TunnelPipe is a simple, extensible, BYOB Continous Integration & Delivery Toolkit written in Javascript (powered by NodeJS). 

### Nomenclature
- Tiny actions like incrementing the version on your NodeJS project (package.json file) and so on are called Holes. Something goes in and an output (String, Boolean) comes out. (think, dots)
- Several such holes link together to form a Pipe. (dots to line)
- Several such pipes circle around each other to create a Tunnel (line in 3 dimensions)

Thus the name, TunnelPipe (we’d love TunnelPipeHole, but that’s too verbose, no? 😉)

### Project Status
TunnelPipe is currently not even worthy of the `alpha` tag. It has just been started off, and will soon aim to be something easy to get started off with. So please don’t use this in production yet. However, feel free to tinker around and send us a PR. 🎉

Given the project’s status, the documentation is sparse, or almost non-existent. 

### ToDo
- [x] Shell scripting module from within Holes
- [ ] Improve pipe structure (determine possibility, unless JSON feels right)
- [ ] Hole: Add git-tag
- [x] Hole: Ensure git branch
- [ ] Hole: Ensure clean staging area
- [ ] Hole: Trigger `test` using the `npm` command

### Front-End CI ToDo
- [ ] Compile *SS to CSS
- [ ] Minify CSS
- [x] gzip CSS
- [ ] Compile *script to Javascript
- [ ] Uglify javascript
- [x] gzip javascript
- [ ] Optimize Image Assets : JPEG, PNG, BMP? (Only if possible using the aforementioned Shell module)
- [ ] S3 sync of assets by correctly setting Mime-Types, Cache-Control, Content-Encoding (if applicable)

Feel free to suggest new todos, items to be added to either of those lists. To do so, open an Issue with the list and references, or fork and send a PR. 

### License
TunnelPipe is released under the MIT License.

### Blokes
- Nikhil Nigade (Dezine Zync Studios)
- Your name here (Like to contribute to this? Get in touch.) 
