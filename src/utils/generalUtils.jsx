export function classNamesMerge(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function maskSensitiveData(data) {
  if (/^[^@]+@[^@]+\.[^@]+$/.test(data)) {
    const [name, domain] = data.split("@");
    const maskedName = name.charAt(0) + "***" + name.charAt(name.length - 1);
    return `${maskedName}@${domain}`;
  } else if (/^\d{10}$/.test(data)) {
    return "*".repeat(data.length - 2) + data.slice(-2);
  } else {
    return data;
  }
}

export function formatPriceToINR(price, showDecimals = false) {
  // Handle non-numeric input
  if (isNaN(price)) {
    return "Invalid Price";
  }

  // Use Intl.NumberFormat for locale-specific formatting
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: showDecimals ? 2 : 0, // Control decimals
  });

  return formatter.format(price);
}

export function hasChildren(item) {
  const { items: children } = item;

  if (children === undefined) {
    return false;
  }

  if (children.constructor !== Array) {
    return false;
  }

  if (children.length === 0) {
    return false;
  }

  return true;
}

export function isValidURL(url) {
  // Regular expression to match a URL pattern
  const urlRegex = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
  return urlRegex.test(url);
}