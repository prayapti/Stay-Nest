const mongoose=require("mongoose");
const Schema= mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    price:Number,
    
    /*image: {
        type: String,
      
        set: (v) => v=== "" ? "https://images.unsplash.com/photo-1624526691826-17de4510b3ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZpbGxhJTIwc3Vuc2V0fGVufDB8fDB8fHww"
        :v,  
    
    },*/
   image: {
  filename: String,
  url: {
    type: String,
    set: (v) => v === "" || v == null 
      ? "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" 
      : v
  }
},


    
    description:String,
    country: {
        type:String,
    },
    
    location:String
});


const listing=mongoose.model("listing",listingSchema);
module.exports = mongoose.model("Listing", listingSchema);

