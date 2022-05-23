// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let pincodes = {
    "342001": ["Jodhpur", "Rajasthan"],
    "363003": ["Ajmer", "Pakisthan"],
    "542009": ["Pokeland", "Abu Dabi"],
  }
    res.status(200).json(pincodes)
  }
  