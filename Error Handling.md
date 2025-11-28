# Notes on error handling 

##  Location and types of error handling
Error handling is managing in several locations in the workflowl.Some follow from others, and some are independendant by themselves

### Mongoose Error Handling

### Internal Mongoose Checks
When Mongoose receives a request, it goes through its own checks against our requirements, based on our schema definition or build-in process. When creating a document for example, it will check: 
 * Anything defined as **required** is present
 * Anything defined as **unique** is not duplicated
 If it finds any errors, they will be raised and returned
 
 **Error messages can be defined in the schema by the user as option parameters such as:**

 ```userSchema
    .pre('save', function (next, passwordValue) {
        if (this.isModified('password')) {
            this.password = bcrypt.hashSync(this.password, 12)
        }
        //Always remember to move on
        next()
    })
``` 
or 

```userSchema
    .pre('validate', function (next) {
        if (this.isModified('password') && this.password !== this._confirmPassword) {
            //invalidate the request
            this.invalidate('confirmPassword', 'Please ensure both passwords match')
        }
        //Run next() when this function is passed, to move to the next middleware 
        // (the function is passed if the password has been modified and matched the confirm password)
        next()
    })
```

