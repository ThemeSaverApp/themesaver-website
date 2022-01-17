const { json } = require('express/lib/response');
const fetch = require('node-fetch');
const user = require('../models/user');
const axios = require('axios')
const riceSchema = require('./../models/rice');

// Utils
const expressError = require('../utils/expressError')
const catchAsync = require('../utils/catchAsync');


const newRicePage = (req, res, next) => {
    res.render('newRice')
}

const createNewRice = catchAsync(async(req, res, next) => {


    response = await fetch(`https://github.com/${req.body.repoLink}/raw/${req.body.branch}/info.json`);
    try{
        data = await response.json()     
    } catch (error) {
        req.flash('error', 'Not A Valid Link. Either the repo link or branch is not right. info.json not found')
        res.redirect('/newRice')
        return null
    }
    if (data['error'] && data['error'] === 'Not Found') {
        req.flash('error', 'Not A Valid Link. Either the repo link or branch is not right. info.json not found')
        res.redirect('/newRice')
        return null
    }   

    

    data['url'] = req.body.repoLink
    data['branch'] = req.body.branch

    currentUser = await user.findOne({'githubID': req.user.id})

    data['user'] = currentUser

    const mainFetch = await fetch(`https://api.github.com/repos/${req.body.repoLink}/git/trees/${req.body.branch}?recursive=1`)
    const main = await mainFetch.json()

    console.log(`https://api.github.com/repos/${req.body.repoLink}/git/trees/${req.body.branch}?recursive=1`, main)
    
    Screenshots = []
    generateScreenshots = async() => {
        for (let folder of main['tree']) {
            console.log(folder)
            if (folder.path === 'Screenshots') {
                console.log(folder)
                screenshotsFetch  = await fetch(folder.url)
                screenshots = await screenshotsFetch.json()
                screenshots['tree'].forEach((screenshot, count) => {
                    Screenshots.push(screenshot.path)
                });
            }
        }
    }

    await generateScreenshots()
    console.log(Screenshots)
    data['Screenshots'] = Screenshots

    console.log(data)
    const rice = new riceSchema(data)
    await rice.save()

    res.redirect('/shop')
 
})

const shopPage = catchAsync(async(req, res, next) => {
    const rices = await riceSchema.find({}).populate('user')
    res.render('shoppage', {rices})
})

const riceDetails = catchAsync(async(req, res) => {
    const rice = await riceSchema.findOne({_id:req.params.id}).populate('user')
	User = req.user
    res.render('details', {rice, User})
})

const updateRice = catchAsync(async(req, res) => {
    const rice = await riceSchema.findById(req.params.id)

    response = await fetch(`https://github.com/${rice.url}/raw/${rice.branch}/info.json`);
    data = await response.json()

    data['user'] = rice.user

    const mainFetch = await fetch(`https://api.github.com/repos/${rice.url}/git/trees/${rice.branch}?recursive=1`)
    const main = await mainFetch.json()

    console.log(`https://api.github.com/repos/${rice.url}/git/trees/${rice.branch}?recursive=1`, mainFetch)
    
    Screenshots = []
    generateScreenshots = async() => {
        for (let folder of main['tree']) {
            console.log(folder)
            if (folder.path === 'Screenshots') {
                console.log(folder)
                screenshotsFetch  = await fetch(folder.url)
                screenshots = await screenshotsFetch.json()
                screenshots['tree'].forEach((screenshot, count) => {
                    Screenshots.push(screenshot.path)
                });
            }
        }
    }

    await generateScreenshots()
    console.log(Screenshots)
    data['Screenshots'] = Screenshots

    const updateRice = await riceSchema.findByIdAndUpdate(req.params.id, data)

    req.flash('success', 'Successfully updated rice')
    res.redirect(`/shop/${req.params.id}`)
})

const deleteRice = catchAsync(async(req, res) => {
    deletedRice = await riceSchema.findByIdAndDelete(req.params.id)
    console.log(deleteRice)
    req.flash('success', 'Successfully deleted rice')
    res.redirect('/shop')
})

module.exports ={newRicePage, createNewRice, shopPage, riceDetails, updateRice, deleteRice}
