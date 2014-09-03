
function License(User, CFC){
    return {
        number      : Number,
        type        : String,
        teacher     : [User]
    };
}

module.exports = License;