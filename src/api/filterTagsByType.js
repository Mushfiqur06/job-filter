export default function filterTagsByType(data, type) {
  function removeDuplicate(arr) {
    return arr.reduce((acc, item) => {
      const newItem = item.toUpperCase();
      if (acc.map((el) => el.toUpperCase()).includes(newItem)) {
        return [...acc];
      } else {
        return [...acc, item];
      }
    }, []);
  }
  if (Array.isArray(data[0][type])) {
    return removeDuplicate(
      data.reduce((acc, job) => [...acc, ...job[type]], [])
    );
  } else {
    return removeDuplicate(data.map((item) => item[type]));
  }
}
