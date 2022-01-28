import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import { httpService } from "./http.service.js";
import { userService } from "./user.service.js";


const STORAGE_KEY = "gig_db";


export const gigService = {
  query,
  getById,
  save,
  remove,
  toggleLike,
  getCategories,
  getPopularCategories,
  getFeaturesByCategory,
  isLikedByUser,
};

async function query(filterBy) {
  return httpService.get("gig", { params: { filterBy } });
}
async function getById(gigId) {
  return httpService.get(`gig/${gigId}`);
}
async function remove(gigId) {
  return httpService.delete(`gig/${gigId}`);
}
async function save(gig) {
  if (gig._id) {
    return httpService.put(`gig/${gig._id}`, gig);
  } else {
    return httpService.post("gig", gig);
  }
}

async function toggleLike(gigId, user) {
  const gig = await getById(gigId);
  if (user) {
    const idx = gig.likedByUser.findIndex(currUser => currUser._id === user._id)
    if (idx === -1) {
      const miniUser = {
        fullname: user.fullname,
        imgUrl: user.imgUrl,
        _id: user._id,
      };
      gig.likedByUser = [...gig.likedByUser, miniUser];
    } else {
      gig.likedByUser.splice(idx, 1)
    }
  } else {
    storageService.saveGuestGigs(gig);
  }
  const data = await save(gig);
  return data;
}

async function getCategories() {
  const categories = await httpService.get("categorie");
  return categories.map((categorie) => categorie.category);
}

async function getPopularCategories(numOfCategories) {
  const categories = await httpService.get("categorie");
  var popularCategories = categories.slice(0, numOfCategories);
  return popularCategories.map((category) => {
    return `${category.category
      .charAt(0)
      .toUpperCase()}${category.category.slice(1)}`;
  });
}
async function getFeaturesByCategory(categoryName) {
  const categories = await httpService.get("categorie");
  const category = categories.find(
    (category) => category.category === categoryName
  );
  return category.features;
}


async function isLikedByUser(gig) {
  const user = await userService.getLoggedinUser()
  return gig.likedByUser.some(currUser => currUser._id === user._id)
}