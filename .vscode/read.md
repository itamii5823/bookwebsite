# notes 



## Routing concept
### frontend 
uses **useParams()** to get value from url 

### backend 
- uses routes like 

```js
router.get("/book/:id") 
```
- gets value using 
**req.param.id**

## Array method

### find
- return only one item
- stop when match found 

```js
arr.find(item=>condition);
```
**use**
- find single element

### filter
- return all matching items (array)
```js
arr.filter(item=>condition);
```
**use**
- search 
- category filtering

### includes
- return true or false
```js
string.includes("text");
```
**use**
- search inside titles/description

### SPLICE
- REMOVE ITEMS FROM ARRAY 
```js
array.splice(startIndex,deleteCount())
arr.splice(1,2);
```
**use**
- delete element at a specific index




