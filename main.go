package main

import (
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

var (
	webRoot = "web-root"
)

func main() {
	router := httprouter.New()
	router.NotFound = http.HandlerFunc(serveStaticFilesOr404)
	log.Fatal(http.ListenAndServe(":8083", router))
}
