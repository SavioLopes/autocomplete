# 1) Autocomplete

#### Install and execute the project:
```
git clone https://github.com/SavioLopes/autocomplete.git
cd autocomplete
npm install
npm start
````

### Routes

##### POST /events
###### JSON to send:
```json
{
  "event": "eventName",
  "timestamp": "date"
}
```
###### HTTP response status codes:
```
201
400
500
```

##### GET /events?event=eventName&limit=integer
###### HTTP response status codes
```
200
204
500
```

### To run tests
```
npm test
````

### HTML autocomplete
```
Open the 'www/index.html' file in your browser, with the API running.
```

# 2) Data Manipulation
##### Command for execute the function:
```
node data-manipulation
```