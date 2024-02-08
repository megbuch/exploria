export const mapStateCodeToName = (stateCode) => {
  // TODO: There are probably more than are listed here, need to figure out what other state codes are avail and map them.
  switch (stateCode.toLowerCase()) {
    case "al":
      return "Alabama";
    case "ak":
      return "Alaska";
    case "az":
      return "Arizona";
    case "ar":
      return "Arkansas";
    case "ca":
      return "California";
    case "co":
      return "Colorado";
    case "ct":
      return "Connecticut";
    case "de":
      return "Delaware";
    case "fl":
      return "Florida";
    case "ga":
      return "Georgia";
    case "hi":
      return "Hawaii";
    case "id":
      return "Idaho";
    case "il":
      return "Illinois";
    case "in":
      return "Indiana";
    case "ia":
      return "Iowa";
    case "ks":
      return "Kansas";
    case "ky":
      return "Kentucky";
    case "la":
      return "Louisiana";
    case "me":
      return "Maine";
    case "md":
      return "Maryland";
    case "ma":
      return "Massachusetts";
    case "mi":
      return "Michigan";
    case "mn":
      return "Minnesota";
    case "ms":
      return "Mississippi";
    case "mo":
      return "Missouri";
    case "mt":
      return "Montana";
    case "ne":
      return "Nebraska";
    case "nv":
      return "Nevada";
    case "nh":
      return "New Hampshire";
    case "nj":
      return "New Jersey";
    case "nm":
      return "New Mexico";
    case "ny":
      return "New York";
    case "nc":
      return "North Carolina";
    case "nd":
      return "North Dakota";
    case "oh":
      return "Ohio";
    case "ok":
      return "Oklahoma";
    case "or":
      return "Oregon";
    case "pa":
      return "Pennsylvania";
    case "ri":
      return "Rhode Island";
    case "sc":
      return "South Carolina";
    case "sd":
      return "South Dakota";
    case "tn":
      return "Tennessee";
    case "tx":
      return "Texas";
    case "ut":
      return "Utah";
    case "vt":
      return "Vermont";
    case "va":
      return "Virginia";
    case "wa":
      return "Washington";
    case "dc":
      return "Washington D.C.";
    case "wv":
      return "West Virginia";
    case "wi":
      return "Wisconsin";
    case "wy":
      return "Wyoming";
    case "mp":
      return "Saipan";
    default:
      return stateCode.toUpperCase();
  }
};
