"use client";

export default function Testimonials() {

const reviews=[

{
name:"Ramesh",
text:"I finally understood UPI without asking anyone."
},

{
name:"Priya",
text:"Saarthi helped me avoid a fake banking scam."
},

{
name:"Anjali",
text:"Now I confidently use digital banking every day."
}

];

return(

<section className="bg-white py-24">

<div className="max-w-6xl mx-auto px-8">

<h2 className="text-center text-5xl font-bold">
Trusted by Customers
</h2>

<div className="grid md:grid-cols-3 gap-8 mt-16">

{reviews.map((review,index)=>(

<div
key={index}
className="rounded-3xl border p-8 shadow"
>

<div className="text-5xl">
😊
</div>

<p className="mt-6 italic">
  {review.text}
</p>
<h3 className="mt-6 font-bold">
- {review.name}
</h3>

</div>

))}

</div>

</div>

</section>

)

}