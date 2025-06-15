import React from 'react';
// Placeholder for user photos. You can use actual image paths or URLs here.
// For now, we'll use simple initials as placeholders.
const UserPhotoPlaceholder = ({ name }: { name: string }) => (
  <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-semibold mb-4 mx-auto">
    {name.split(' ').map(n => n[0]).join('')}
  </div>
);

const testimonialsData = [
  {
    name: 'Aditi & Rohan',
    quote: "We swiped right in 2024, and now we're planning our wedding! Thank you, Wedder!",
    imagePlaceholder: 'AR',
  },
  {
    name: 'Priya & Sameer',
    quote: "Found my soulmate on Wedder! The verified profiles gave us peace of mind. Highly recommend!",
    imagePlaceholder: 'PS',
  },
  {
    name: 'Neha & Vikram',
    quote: "Tired of casual dating apps, Wedder was a breath of fresh air. We connected on shared values and goals.",
    imagePlaceholder: 'NV',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-16">
          Real Stories. Real Connections.
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300"
            >
              <UserPhotoPlaceholder name={testimonial.imagePlaceholder} />
              <p className="text-muted-foreground italic text-lg mb-4 text-center">"{testimonial.quote}"</p>
              <p className="text-foreground font-semibold text-right text-md">– {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
