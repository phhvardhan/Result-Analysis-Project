export function hasChildren(item) {
    const { items: children } = item;
  
    if (item.reg === undefined) {
        console.log('hh')
      return false;
    }
  
    if (item.length === 0) {
      return false;
    }
  
    return true;
  }
  