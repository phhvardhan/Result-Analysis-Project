export function hasChildren2(item) {
  
    if (item.data === undefined) {
      return false;
    }
    if (item.data === 0) {
      return false;
    }
  
    return true;
  }
  