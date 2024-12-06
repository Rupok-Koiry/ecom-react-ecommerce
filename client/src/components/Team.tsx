const Team = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO",
      photo:
        "https://images.pexels.com/photos/14520051/pexels-photo-14520051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Ali Khan",
      role: "COO",
      photo:
        "https://images.pexels.com/photos/8366854/pexels-photo-8366854.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      name: "Mike Johnson",
      role: "Fleet Manager",
      photo:
        "https://images.pexels.com/photos/6481907/pexels-photo-6481907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Sarah Smith",
      role: "Social Media Manager",
      photo:
        "https://images.pexels.com/photos/1130625/pexels-photo-1130625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];
  return (
    <section className="my-8 lg:my-12">
      <h2 className="text-3xl text-center font-semibold  mb-4">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-secondary-background p-4 rounded-lg">
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-secondary-text">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
