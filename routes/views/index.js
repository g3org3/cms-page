var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';


	var Gallery = keystone.list('Gallery').model
	var _banner = '';

	Gallery.findOne().where('name', 'front banner').exec()
	.then( bannerGallery => {
		var banner = null;
		if (bannerGallery) {

			console.log('>', bannerGallery.images.map(image => image.url))
			if (bannerGallery.images.length>0)
			banner = bannerGallery.images.map(image => image.url)[bannerGallery.images.length-1]


		}

		_banner = banner;

		return Gallery.findOne().where('name', 'carousel').exec()
	}, err => {
		console.log(err)
	})
	.then(carousel => {

		if (!carousel)
			return view.render('index', {banner: _banner, carousel: []})

		var _carousel = carousel.images.map(image => image.url)

		// Render the view
		view.render('index', { banner: _banner, carousel: _carousel });
	})

};
