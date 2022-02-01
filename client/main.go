package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
)

const BASE_URL = "http://localhost:3000/"
const CONTENT_TYPE = "application/json"
const LAST_POST = 10

type ApiResponse struct {
	ok         bool
	postNumber int
	serial     string
	valid      bool
}

func main() {
	c := make(chan ApiResponse)

	json_data := getJson("202201300005")
	for post := 1; post <= LAST_POST; post++ {
		go registerSerial(json_data, post, c)
	}

	for post := 1; post <= LAST_POST; post++ {
		apiResponse := <-c
		fmt.Println(apiResponse.serial, apiResponse.postNumber, apiResponse.valid)
	}

	// apiResponse := <-c
	// for apiResponse.postNumber > 0 && !apiResponse.valid {
	// 	go registerSerial(json_data, apiResponse.postNumber, c)
	// 	apiResponse = <-c
	// }

}

func getJson(serial string) []byte {
	values := map[string]string{"serial": serial}
	json_data, err := json.Marshal(values)
	if err != nil {
		log.Fatal(err)
	}

	return json_data
}

func registerSerial(json_data []byte, post int, c chan ApiResponse) {
	res, err := http.Post(BASE_URL+"post/"+strconv.Itoa(post), CONTENT_TYPE, bytes.NewBuffer(json_data))

	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}
	defer res.Body.Close()

	io.Copy(os.Stdout, res.Body)
	decoder := json.NewDecoder(res.Body)
	var data ApiResponse
	err = decoder.Decode(&data)

	c <- data
}
