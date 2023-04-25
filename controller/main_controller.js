let content = require("../content").content;
let writeJSON = require("../content").writeJSON;



let mainController = {
    getIndex: (req, res) => {
        const index = content.find(function (page) {
            return page.page == 'index'
        })
        loginStatus = req.isAuthenticated();
        res.render("index", {
            page: index,
            user: loginStatus,
        });
    },

    getMenu: (req, res) => {
        loginStatus = req.isAuthenticated();
        res.render("menu", {
            user: loginStatus,
        });
    },
    getPrograms: (req, res) => {
        const programs = content.find(function (page) {
            return page.page == 'programs'
        })
        loginStatus = req.isAuthenticated();
        res.render("programs", {
            page: programs,
            user: loginStatus,
        });
    },
    getAboutUs: (req, res) => {
        const aboutus = content.find(function (page) {
            return page.page == 'aboutus'
        })
        loginStatus = req.isAuthenticated();
        res.render("aboutus", {
            page: aboutus,
            user: loginStatus,
        });
    },
    getMealDelivery: (req, res) => {
        const mealdelivery = content.find(function (page) {
            return page.page == 'mealdelivery'
        })

        loginStatus = req.isAuthenticated();
        res.render("mealdelivery", {
            page: mealdelivery,
            user: loginStatus,
        });
    },
    getVolunteer: (req, res) => {
        const volunteer = content.find(function (page) {
            return page.page == 'volunteer'
        })
        loginStatus = req.isAuthenticated();
        res.render("volunteer", {
            page: volunteer,
            user: loginStatus,
        });
    },
    getSupporters: (req, res) => {
        const supporters = content.find(function (page) {
            return page.page == 'supporters'
        })
        loginStatus = req.isAuthenticated();
        res.render("supporters", {
            page: supporters,
            user: loginStatus,
        });
    },
    getPay: (req, res) => {
        const pay = content.find(function (page) {
            return page.page == 'pay'
        })
        loginStatus = req.isAuthenticated();
        res.render("pay", {
            page: pay,
            user: loginStatus
        });
    },
    getSignUp: (req, res) => {
        const signup = content.find(function (page) {
            return page.page == 'signup'
        })
        loginStatus = req.isAuthenticated();
        res.render("signup", {
            page: signup,
            user: loginStatus,
        });
    },
    getDonate: (req, res) => {
        const donate = content.find(function (page) {
            return page.page == 'donate'
        })
        loginStatus = req.isAuthenticated();
        res.render("donate", {
            page: donate,
            user: loginStatus,
        });
    },
    getOpportunites: (req, res) => {
        res.render("opportunities");
    },
    getAldergrove: (req, res) => {
        const aldergrove = content.find(function (page) {
            return page.page == 'aldergrove'
        })
        loginStatus = req.isAuthenticated();
        res.render("aldergrove", {
            page: aldergrove,
            user: loginStatus,
        });
    },
    getLogin: (req, res) => {

        const login = content.find(function (page) {
            return page.page == 'login'
        })
        loginStatus = req.isAuthenticated();
        res.render("login", {
            page: login,
            user: loginStatus,
        });
    },

    getInventory: (req, res) => {
        loginStatus = req.isAuthenticated();
        // for (i = 0; i < items.length; i++) {
        //     console.log(items[i]);
        // }
        res.render("inventory", {
            user: loginStatus,
        });
    },
    getShifts: (req, res) => {
        loginStatus = req.isAuthenticated();
        res.render("shift", {
            user: loginStatus,
        });
    },
    getContact: (req, res) => {
        const contact = content.find(function (page) {
            return page.page == 'contact'
        })
        loginStatus = req.isAuthenticated();
        res.render("contact", {
            page: contact,
            user: loginStatus,
        });
    },
    getNews: (req, res) => {
        // const contact = content.find(function (page) {
        //     return page.page == 'news'
        // })
        loginStatus = req.isAuthenticated();
        res.render("news", {
            // page: news,
            user: loginStatus,
        });
    },
    // CMS functions
    edit: (req, res) => {
        // Edit a specific box
        const itemToEdit = req.params.id
        const pageToEdit = req.params.page
        const origin = pageToEdit
        // Find correct page first
        const pageDetails = content.find(function (page) {
            return page.page == pageToEdit
        });
        // Find correct box on page
        const itemDetails = pageDetails.details.find(function (item) {
            return item.id == itemToEdit;
        });
        loginStatus = req.isAuthenticated();
        res.render("edits", {
            content: itemDetails,
            origin: origin,
            user: loginStatus
        });
    },
    update: (req, res) => {
        const itemToEdit = req.params.id
        const pageToEdit = req.params.page
        const origin = pageToEdit

        // Find correct page first
        const pageDetails = content.find(function (page) {
            return page.page == pageToEdit
        });
        // Find correct box on page
        const itemDetails = pageDetails.details.find(function (item) {
            return item.id == itemToEdit;
        });

        // If a content type was selected
        if (req.body.contentType) {
            itemDetails.contentType = req.body.contentType
        }
        itemDetails.title = req.body.title;
        itemDetails.description = req.body.description;
        itemDetails.hasButton = req.body.buttonCheck;
        if (req.body.buttonCheck == "True") {
            itemDetails.buttonText = req.body.buttonText
            itemDetails.buttonLink = req.body.buttonLink
        } else {
            itemDetails.buttonText = ""
            itemDetails.buttonLink = ""
        }
        if (itemDetails.contentType == "button") {
            if (itemDetails.buttonText == "" && itemDetails.title != "") {
                itemDetails.buttonLink = itemDetails.title
                itemDetails.hasButton = "True"
            }
            itemDetails.buttonLink = itemDetails.imagePath
        }
        if (itemDetails.contentType == "board") {
            itemDetails.role = req.body.role
        }

        // You would want to write to a file/database here.
        writeJSON(req.params.page);
        res.redirect("/" + origin);
    },
    delete: (req, res) => {
        // Deletes an object
        const itemToEdit = req.params.id
        const pageToEdit = req.params.page

        loginStatus = req.isAuthenticated();
        res.render("delete", {
            user: loginStatus,
            page: pageToEdit,
            item: itemToEdit
        });
    },
    add: (req, res) => {
        // Edit a specific box
        const pageToEdit = req.params.page

        // Find correct page first
        const pageDetails = content.find(function (page) {
            return page.page == pageToEdit
        });

        let idNum = Number(1)
        if (pageDetails.details.length != 0) {
            if (typeof pageDetails.details[pageDetails.details.length - 1].contentType === 'undefined') {
                pageDetails.details[pageDetails.details.length - 1].imagePath = "";
                idNum = Number(pageDetails.details[pageDetails.details.length - 1].id);
            } else {
                idNum = Number(pageDetails.details[pageDetails.details.length - 1].id + 1);
                let newItem = {
                    id: idNum,
                    imagePath: "",
                    title: req.body.title,
                    description: "",
                    hasButton: "False",
                    buttonText: "",
                    buttonLink: "",
                    contentType: req.body.contentType,
                };
                pageDetails.details.push(newItem);
            }
        }
        loginStatus = req.isAuthenticated();
        res.redirect("/edit/" + pageToEdit + "/" + idNum);
    },
    editImage: (req, res) => {
        // Edit a specific box
        const itemToEdit = req.params.id
        const pageToEdit = req.params.page
        const origin = '/' + pageToEdit + '/' + itemToEdit
        // Find correct page first
        const pageDetails = content.find(function (page) {
            return page.page == pageToEdit
        });
        // Find correct box on page
        const itemDetails = pageDetails.details.find(function (item) {
            return item.id == itemToEdit;
        });
        loginStatus = req.isAuthenticated();
        res.render("editimage", {
            content: itemDetails,
            origin: origin,
            user: loginStatus
        });
    }





}

module.exports = mainController;