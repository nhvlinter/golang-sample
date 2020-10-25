package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

var db *sql.DB

var err error

type User struct {
	Id    int
	Name  string
	Email string
}

func main() {
	debugmode := "true"
	if debugmode == "true" {
		db, err = sql.Open("mysql", "root:123456@tcp(localhost:3306)/golang_sample")
	} else {
		// connectionName := mustGetenv("CLOUDSQL_CONNECTION_NAME")
		// user := mustGetenv("CLOUDSQL_USER")
		// password := os.Getenv("CLOUDSQL_PASSWORD") // NOTE: password may be empty
		// db, err = sql.Open("mysql", fmt.Sprintf("%s:%s@cloudsql(%s)/GoJudge", user, password, connectionName))
	}

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err.Error())
	}
	router := mux.NewRouter()
	router.HandleFunc("/api/list", GetAll)
	router.HandleFunc("/api/user", Insert)
	router.HandleFunc("/api/update", Update)
	router.HandleFunc("/api/delete", Delete)
	http.ListenAndServe("0.0.0.0:9999", router)
	// handler := http.NewServeMux()
	// ///we create a new router to expose our api
	// //to our users
	// handler.HandleFunc("/api/list", GetAll)
	// handler.HandleFunc("/api/user", Insert)
	// handler.HandleFunc("/api/update", Update)
	// handler.HandleFunc("/api/delete", Delete)
	// //Every time a  request is sent to the endpoint ("/api/hello") the function SayHello will be invoked
	// http.ListenAndServe("0.0.0.0:9999", handler)
	//we tell our api to listen to all request to port 9999.
}

func GetAll(w http.ResponseWriter, r *http.Request) {
	//Allow CORS here By * or specific origin
	w.Header().Set("Access-Control-Allow-Origin", "*")

	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	//notice how this function takes two parameters
	//the first parameter is a ResponseWriter writer and this is where we wite the response we want to send back to the user
	//the second parameter is a pointer of type  http.Request this holds all inforamtion of the request sent by the used
	//this may include query parameters,path parameters and many more
	var (
		id    int
		name  string
		email string
	)
	var userList []User
	rows, err := db.Query("select id, name, email from users")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	for rows.Next() {
		err := rows.Scan(&id, &name, &email)
		if err != nil {
			log.Fatal(err)
		}
		userList = append(userList, User{id, name, email})
		//log.Println(id, name)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Get all data")
	json.NewEncoder(w).Encode(userList)
}
func Insert(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	log.Println(string(body))
	var user User
	err = json.Unmarshal(body, &user)
	if user.Name == "" || user.Email == "" {
		return
	}
	_, err = db.Exec("INSERT INTO users(name, email) VALUES(?, ?)", user.Name, user.Email)
	if err != nil {
		http.Error(w, "Insert error, unable to create your account.", 500)
		return
	}

	w.Write([]byte("User created!"))
}
func Update(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	log.Println(string(body))
	var user User
	err = json.Unmarshal(body, &user)
	if user.Name == "" || user.Email == "" {
		return
	}
	_, err = db.Exec("UPDATE users SET name=?,email=? where id=?", user.Name, user.Email, user.Id)
	if err != nil {
		http.Error(w, "Update error, unable to update your account.", 500)
		return
	}

	w.Write([]byte("User updated!"))
}
func Delete(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	log.Println(string(body))
	var user User
	err = json.Unmarshal(body, &user)
	if user.Name == "" || user.Email == "" {
		return
	}
	_, err = db.Exec("DELETE FROM users where id=?", user.Id)
	if err != nil {
		http.Error(w, "Delete error, unable to Delete your account.", 500)
		return
	}

	w.Write([]byte("User Deleted!"))
}
