const express=require("express"); //require all 
const app=express();
const mongoose=require("mongoose");
const Listing = require("./models/listing");
const path=require("path");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");

const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';

 main().then(()=>{
         console.log("connected to db");      //main func call
 })
 .catch((err)=>{                               //error aya toh catch karo
    console.log(err);
 });

 async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));    //views ke andar lisitngs folder bnaya usko join kia
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname, "public")));


// api connection to server 
app.get('/', (req,res) => {
    res.send("root working ");
});

// index route tha (index.ejs ko connect kia )
app.get("/listings",async (req,res)=>{
   const allListings= await Listing.find({});
   res.render("listings/index", { allListings });
    })

     //new route details (image price loc...) add karne ka route yeh show route ke pehle kiya kyki 
     // listing id ko find kara tha voh show route mein
    app.get("/listings/new",async (req,res)=>{
        res.render("listings/new.ejs");
 });

    //show route
    app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
   const listing= await Listing.findById(id);
   res.render("listings/show",{listing});
    });


    // Form page (New)
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Create route (form submission)
app.post("/listings", async (req, res) => {
    let listing = new Listing(req.body.listing); // ✅ Correctly extract 'listing' object
    await listing.save();
    res.redirect("/listings");
});

//edit route 
app.get("/listings/:id/edit",async (req,res)=>{
     let {id}=req.params;
   const listing= await Listing.findById(id);
   res.render("listings/edit.ejs", {listing})
});

//update route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    res.redirect(`/listings/${id}`);
});

//delete route

// ✅ Correct DELETE route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});


/*app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing );
    res.redirect("/listings");
    });/*


    //create route like details add karne ke baad ki process after new route process 
    /* app.get("/listings/new",async (req,res)=>{
        //let{title,description,location,country,price}=req.body
        let listing=req.body;
        console.log(listing);
 });*/



 //get route
/*app.get("/testListing", async (req, res) => {
   let sampleListing = new Listing({ // ✅ Capital "L"
        title: "my new villa",
        description: "by the bae beach",
        price: 1500,
        location: "munnar, kerala",
        country: "India",
        image: "" // optional; default image will be set
    });
 
    
    await sampleListing.save();
    console.log("saved");
    res.send("successful");
});*/


//server 
app.listen(8080,()=>{
    console.log("server is listening to port");
});