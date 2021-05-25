exports.seed = function (knex) {
  console.log("1st seed - companies");
  return knex("companies")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("companies").insert([
        {
          name: "Facebook",
          url: "https://facebook.com/careers",
          logo_url: "https://www.facebook.com/images/fb_icon_325x325.png",
          linkedin: "http://www.linkedin.com",
          twitter: "http://www.twitter.com",
          facebook: "http://www.facebook.com",
          instagram: "http://www.instagram.com",
        },
        {
          name: "Google",
          url: "https://google.com/careers",
          logo_url:
            "https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png",
          linkedin: "http://www.linkedin.com",
          twitter: "http://www.twitter.com",
          facebook: "http://www.facebook.com",
          instagram: "http://www.instagram.com",
        },
      ]);
    });
};
