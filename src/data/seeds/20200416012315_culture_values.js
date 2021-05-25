exports.seed = function (knex) {
  console.log("3rd seed - culture_values");
  // Deletes ALL existing entries
  return knex("culture_values")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("culture_values").insert([
        {
          name: "Diverse Team",
          type: "Organization Values",
          description: "We hire everyone as a value",
        },
        {
          name: "Light Meetings",
          type: "Daily Routines",
          description: "Don't waste your time on endless meetings when no decision is being made",
        },
        {
          name: "Scallable System",
          type: "Engineering",
          description: "Built for 1000x users from day one",
        },
        {
          name: "BDD",
          type: "Engineering",
          description: "Behavior driven development",
        },
        {
          name: "Wears Many Hats",
          type: "Organization Values",
          description: "Experience many roles",
        },
      ]);
    });
};
