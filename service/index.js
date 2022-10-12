const app = require("./app")

app.listen(app.get("port"), () => {
    console.log("funcionando en el puerto", app.get("port"))
})