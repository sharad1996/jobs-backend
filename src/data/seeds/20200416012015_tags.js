exports.seed = function (knex) {
  console.log("2nd seed - tags");
  // Deletes ALL existing entries
  return knex("tags")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tags").insert([
        { name: "Leadership", description: "Managerial role" },
        { name: "IC", description: "Individual contributor, non managerial role" },
        {
          name: "Senior",
          description: "Experienced",
        },
        {
          name: "Mid Level",
          description: "Between a junior and a senior",
        },
        {
          name: "Entry Level",
          description: "Just entering the field",
        },
        {
          name: "Junior",
          description: "Knows the way around",
        },
        {
          name: "Director",
          description: "Manage multiple teams and above",
        },
      ]);
    });
};
