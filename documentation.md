**Show All Pokemons**
----
  Returns json data about all pokemons.

* **URL**

  /api/v1/pokemons

* **Method:**

  `GET`
  
*  **URL Params**
   
   `count=[integer], default value=10`<br>
   `after=[integer], default value=0`<br>
   **Required:**

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [{
        "name": {
            "english": "Bulbasaur",
            "japanese": "フシギダネ",
            "chinese": "妙蛙种子",
            "french": "Bulbizarre"
        },
        "base": {
            "HP": 45,
            "Attack": 49,
            "Defense": 49,
            "Speed": 45
        },
        "_id": "63dc29cc8b67f8eea36372e1",
        "id": 1,
        "type": ["Grass", "Poison"],
        "__v": 0
    }, {
        "name": {
            "english": "Ivysaur",
            "japanese": "フシギソウ",
            "chinese": "妙蛙草",
            "french": "Herbizarre"
        },
        "base": {
            "HP": 60,
            "Attack": 62,
            "Defense": 63,
            "Speed": 60
        },
        "_id": "63dc29cc8b67f8eea36372e2",
        "id": 2,
        "type": ["Grass", "Poison"],
        "__v": 0
    }, {
        "name": {
            "english": "Venusaur",
            "japanese": "フシギバナ",
            "chinese": "妙蛙花",
            "french": "Florizarre"
        },
        "base": {
            "HP": 80,
            "Attack": 82,
            "Defense": 83,
            "Speed": 80
        },
        "_id": "63dc29cd8b67f8eea36372e3",
        "id": 3,
        "type": ["Grass", "Poison"],
        "__v": 0
    }, {
        "name": {
            "english": "Charmander",
            "japanese": "ヒトカゲ",
            "chinese": "小火龙",
            "french": "Salamèche"
        },
        "base": {
            "HP": 39,
            "Attack": 52,
            "Defense": 43,
            "Speed": 65
        },
        "_id": "63dc29cd8b67f8eea36372e4",
        "id": 4,
        "type": ["Fire"],
        "__v": 0
    }, {
        "name": {
            "english": "Charmeleon",
            "japanese": "リザード",
            "chinese": "火恐龙",
            "french": "Reptincel"
        },
        "base": {
            "HP": 58,
            "Attack": 64,
            "Defense": 58,
            "Speed": 80
        },
        "_id": "63dc29cd8b67f8eea36372e5",
        "id": 5,
        "type": ["Fire"],
        "__v": 0
    }, {
        "name": {
            "english": "Charizard",
            "japanese": "リザードン",
            "chinese": "喷火龙",
            "french": "Dracaufeu"
        },
        "base": {
            "HP": 78,
            "Attack": 84,
            "Defense": 78,
            "Speed": 100
        },
        "_id": "63dc29cd8b67f8eea36372e6",
        "id": 6,
        "type": ["Fire", "Flying"],
        "__v": 0
    }, {
        "name": {
            "english": "Squirtle",
            "japanese": "ゼニガメ",
            "chinese": "杰尼龟",
            "french": "Carapuce"
        },
        "base": {
            "HP": 44,
            "Attack": 48,
            "Defense": 65,
            "Speed": 43
        },
        "_id": "63dc29cd8b67f8eea36372e7",
        "id": 7,
        "type": ["Water"],
        "__v": 0
    }, {
        "name": {
            "english": "Wartortle",
            "japanese": "カメール",
            "chinese": "卡咪龟",
            "french": "Carabaffe"
        },
        "base": {
            "HP": 59,
            "Attack": 63,
            "Defense": 80,
            "Speed": 58
        },
        "_id": "63dc29cd8b67f8eea36372e8",
        "id": 8,
        "type": ["Water"],
        "__v": 0
    }, {
        "name": {
            "english": "Blastoise",
            "japanese": "カメックス",
            "chinese": "水箭龟",
            "french": "Tortank"
        },
        "base": {
            "HP": 79,
            "Attack": 83,
            "Defense": 100,
            "Speed": 78
        },
        "_id": "63dc29cd8b67f8eea36372e9",
        "id": 9,
        "type": ["Water"],
        "__v": 0
    }, {
        "name": {
            "english": "Caterpie",
            "japanese": "キャタピー",
            "chinese": "绿毛虫",
            "french": "Chenipan"
        },
        "base": {
            "HP": 45,
            "Attack": 30,
            "Defense": 35,
            "Speed": 45
        },
        "_id": "63dc29cd8b67f8eea36372ea",
        "id": 10,
        "type": ["Bug"],
        "__v": 0
    }] 
    ```
    
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"errMsg":"No Pokemons found"}`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"errMsg":"CastError: Cast to Number failed for value \"a\" (type string) at path \"skip\""}`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/v1/pokemons?count=50&after=250",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

**Show Pokemon**
----
  Returns json data about a single pokemon.

* **URL**

  /api/v1/pokemon/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"id":1,"name":{"english":"Bulbasaur","japanese":"フシギダネ","chinese":"妙蛙种子","french":"Bulbizarre"},"type":["Grass","Poison"],"base":{"HP":45,"Attack":49,"Defense":49,"Sp. Attack":65,"Sp. Defense":65,"Speed":45}}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"errMsg":"Pokemon not found"}`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"errMsg":"CastError: pokemon id must contain only digits"}`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/v1/pokemon/120",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
**Create Pokemon**
----
  Create new Pokemon and add it to the database.

* **URL**

  /api/v1/pokemon

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
  None

* **Data Params**

  ```javascript
  {
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        english: {
            type: String,
            required: true,
        },
        japanese: String,
        chinese: String,
        french: String
    },
    type: {
        type: [String],
        enum: pokemonTypes,
        required: true
    },
    base: {
        HP: Number,
        Attack: Number,
        Defense: Number,
        'Speed Attack': Number,
        'Speed Defense': Number,
        'Speed': Number
    }
  }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{"id":1,"name":{"english":"Bulbasaur","japanese":"フシギダネ","chinese":"妙蛙种子","french":"Bulbizarre"},"type":["Grass","Poison"],"base":{"HP":45,"Attack":49,"Defense":49,"Sp. Attack":65,"Sp. Defense":65,"Speed":45}}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"errMsg":"Pokemon not found"}`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `"errMsg": "Invalid pokemon data. ValidationError: type.1: `Paper` is not a valid enum value for path `type.1`."`
  
  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `"errMsg": "Duplicate Pokemon"`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/v1/pokemon",
      dataType: "json",
      type : "POST",
      data: {
        "name": {
          "english": "test",
          "japanese": "test",
          "chinese": "test",
          "french": "test"
        },
        "base": {
          "HP": 50,
          "Attack": 20,
          "Defense": 55,
          "Speed": 30,
          "Speed Attack": 25,
          "Speed Defense": 25
        },

        "id": 1000,
        "type": [
          "Bug"
        ],
        "__v": 0
     },
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
**Upsert Pokemon**
----
  Update/Insert Pokemon in database.

* **URL**

  /api/v1/pokemon/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
   
   `id=[integer]`

* **Data Params**

  ```javascript
  {
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        english: {
            type: String,
            required: true,
        },
        japanese: String,
        chinese: String,
        french: String
    },
    type: {
        type: [String],
        enum: pokemonTypes,
        required: true
    },
    base: {
        HP: Number,
        Attack: Number,
        Defense: Number,
        'Speed Attack': Number,
        'Speed Defense': Number,
        'Speed': Number
    }
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
`{
  "msg": "Upserted Successfully",
  "pokeInfo": {
    "name": {
      "english": "test",
      "japanese": "test",
      "chinese": "test",
      "french": "test"
    },
    "base": {
      "HP": 70,
      "Attack": 10,
      "Defense": 55,
      "Speed": 30,
      "Speed Attack": 25,
      "Speed Defense": 25
    },
    "_id": "63dc48ac4fe5e7fa87eaf7d2",
    "id": 1000,
    "__v": 0,
    "type": [
      "Bug",
      "Electric"
    ]
  }
}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"errMsg":"CastError: pokemon id must contain only digits"}`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `"errMsg": "Duplicate Pokemon"`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `"errMsg": "Invalid pokemon data. ValidationError: type.1: `Paper` is not a valid enum value for path `type.1`."`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/v1/pokemon/1000",
      dataType: "json",
      type : "PUT",
      data: {
        "name": {
          "english": "test",
          "japanese": "test",
          "chinese": "test",
          "french": "test"
        },
        "base": {
          "HP": 70,
          "Attack": 10,
          "Defense": 55,
          "Speed": 30,
          "Speed Attack": 25,
          "Speed Defense": 25
        },

        "id": 1000,
        "type": [
          "Bug"
        ],
        "__v": 0
     },
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
**Update Pokemon**
----
  Partially update Pokemon in database.

* **URL**

  /api/v1/pokemon/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  ```javascript
    {
      id: {
          type: Number,
          unique: true,
          required: true
      },
      name: {
          english: {
              type: String,
              required: true,
          },
          japanese: String,
          chinese: String,
          french: String
      },
      type: {
          type: [String],
          enum: pokemonTypes,
          required: true
      },
      base: {
          HP: Number,
          Attack: Number,
          Defense: Number,
          'Speed Attack': Number,
          'Speed Defense': Number,
          'Speed': Number
      }
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
`{
  "msg": "Updated Successfully",
  "pokeInfo": {
    "name": {
      "english": "test",
      "japanese": "test",
      "chinese": "test",
      "french": "test"
    },
    "base": {
      "HP": 66,
      "Attack": 20,
      "Defense": 55,
      "Speed": 30,
      "Speed Attack": 25,
      "Speed Defense": 25
    },
    "_id": "63dc49784fe5e7fa87ec0677",
    "id": 1000,
    "__v": 0,
    "type": [
      "Bug",
      "Electric"
    ]
  }
}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"errMsg":"CastError: pokemon id must contain only digits"}`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `"errMsg": "Invalid pokemon data. ValidationError: type.1: `Paper` is not a valid enum value for path `type.1`."`
    
  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `"errMsg": "Pokemon not found"`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/v1/pokemon/1000",
      dataType: "json",
      type : "PUT",
      data:
      {
        "base": {
          "HP": 66,
          "Attack": 20,
          "Defense": 55,
          "Speed": 30,
          "Speed Attack": 25,
          "Speed Defense": 25
        }
      },
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
  
**Delete Pokemon**
----
  Delete Pokemon from database.

* **URL**

  /api/v1/pokemon/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

    **Required:**
 
   `id=[integer]`


* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
`{
  "msg": "Deleted Successfully",
  "pokeInfo": {
    "name": {
      "english": "test",
      "japanese": "test",
      "chinese": "test",
      "french": "test"
    },
    "base": {
      "HP": 66,
      "Attack": 20,
      "Defense": 55,
      "Speed": 30,
      "Speed Attack": 25,
      "Speed Defense": 25
    },
    "_id": "63dc49784fe5e7fa87ec0677",
    "id": 1000,
    "__v": 0,
    "type": [
      "Bug",
      "Electric"
    ]
  }
}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"errMsg":"CastError: pokemon id must contain only digits"}`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `"errMsg": "Pokemon not found"`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/v1/pokemon/1000",
      dataType: "json",
      type : "DELETE",
      success : function(r) {
        console.log(r);
      }
    });
  ```
  

