import { gigService } from "./gig.service";
import { orderService } from "./order.service";
import { userService } from "./user.service";

export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  saveGuestGigs,
  isLikedByGuest,
};
var guestGigs = JSON.parse(localStorage.getItem("guestGigs_db")) || [];

function query(entityType, filterBy, delay = 300) {
  // _save("user_db", userService.createUsers());
  var entities =
    JSON.parse(localStorage.getItem(entityType)) || gigService.createGigs();
  if (entities) _save(entityType, entities);

  // const sortBy = filterBy ? filterBy.sortBy : 'name'
  // const sortedEntities = getSortedEntities(entities, sortBy)
  // const filteredEntities = getFilteredEntities(sortedEntities, filterBy)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject('OOOOPs')
      resolve(entities);
    }, delay);
  });
}

function getSortedEntities(entities, sortBy = "name") {
  switch (sortBy) {
    case "name":
      return entities.sort(function (a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    case "price":
      return entities.sort(function (a, b) {
        return a.price - b.price;
      });
  }
}

function getFilteredEntities(entities, filterBy) {
  if (!filterBy) return entities;
  let filteredToys = entities;
  filteredToys = entities.filter((toy) =>
    toy.name.toLowerCase().includes(filterBy.name.toLowerCase())
  );

  if (filterBy.selectedLabels.length) {
    filteredToys = filteredToys.filter((toy) => {
      const isOutsideFilter = toy.labels.some((label) => {
        const isFilter = filterBy.selectedLabels.some((selectedLabel) => {
          return selectedLabel.value.includes(label.value);
        });
        return isFilter;
      });
      if (isOutsideFilter) return toy;
    });
  }

  switch (filterBy.type) {
    case "all":
      return filteredToys;
    case "inStock":
      return filteredToys.filter((toy) => toy.inStock);
    case "finished":
      return filteredToys.filter((toy) => !toy.inStock);
  }
}

function get(entityType, entityId) {
  return query(entityType)
    .then((entities) => entities.find((entity) => entity._id === entityId))
    .then((entity) => {
      // entity.reviews = reviews
      return entity;
    });
}
function post(entityType, newEntity) {
  newEntity._id = _makeId();
  newEntity.createdAt = Date.now();
  return query(entityType).then((entities) => {
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
  });
}

function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex(
      (entity) => entity._id === updatedEntity._id
    );
    entities.splice(idx, 1, updatedEntity);
    _save(entityType, entities);
    return updatedEntity;
  });
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === entityId);
    entities.splice(idx, 1);
    _save(entityType, entities);
  });
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

function _makeId(length = 5) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function saveGuestGigs(gig) {
  const gigIdx = guestGigs.findIndex((guestGig) => guestGig._id === gig._id);
  if (gigIdx !== -1) guestGigs.splice(gigIdx, 1);
  else guestGigs = [...guestGigs, gig];
  localStorage.setItem("guestGigs_db", JSON.stringify(guestGigs));
}

function isLikedByGuest(gigId) {
  return guestGigs.some((guestGig) => guestGig._id === gigId);
}
