import {
    COLOR_TOUDOO,
    COLOR_WAHOO,
    COLOR_TATOO,
    COLOR_UN_PEU,
    COLOR_BEAUCOUP,
    COLOR_A_LA_FOLIE,
    COLOR_PASSIONEMENT,
    COLOR_FIBER,
    COLOR_ONE,
    COLOR_DEFAULT_PACK
} from '../styles/commonStyles';

const packMetadata = {
    "1P_DOO": {
        image: require('../../assets/img/toudoo-short.png'),
        name: 'toudou',
        color: COLOR_TOUDOO
    },
    "1P_HOO": {
        image: require('../../assets/img/wahoo-short.png'),
        name: 'wahoo',
        color: COLOR_WAHOO
    },
    "2P_TV_DOO": {
        image: require('../../assets/img/toudoo-short.png'),
        name: 'toudoo',
        color: COLOR_TOUDOO
    },
    "2P_TV_HOO": {
        image: require('../../assets/img/wahoo-short.png'),
        name: 'wahoo',
        color: COLOR_WAHOO
    },
    "2P_TV_TOO": {
        image: require('../../assets/img/tatoo-short.png'),
        name: 'tatoo',
        color: COLOR_TATOO
    },
    "3P_DOO": {
        image: require('../../assets/img/toudoo-short.png'),
        name: 'toudoo',
        color: COLOR_TOUDOO
    },
    "3P_HOO": {
        image: require('../../assets/img/wahoo-short.png'),
        name: 'wahoo',
        color: COLOR_WAHOO
    },
    "3P_TOO": {
        image: require('../../assets/img/tatoo-short.png'),
        name: 'tatoo',
        color: COLOR_TATOO
    },
    "2P_ECO_DOO": {
        name: "NET + TEL",
        color: COLOR_TOUDOO
    },
    "2P_TV_ECO": {
        name: "TV + TEL",
        color: COLOR_DEFAULT_PACK
    },
    "VTEECO+": {
        name: "S&WE",
        color: COLOR_DEFAULT_PACK
    },
    "VTEBLA": {
        name: "24/7",
        color: COLOR_DEFAULT_PACK
    },
    "2P_PRO": {
        name: "NET + TEL PRO",
        color: COLOR_UN_PEU
    },
    "3P_PRO": {
        name: "TRIO PRO",
        color: COLOR_UN_PEU
    },
    "2P_TV_PEU": {
        name: "Un peu",
        color: COLOR_UN_PEU
    },
    "2P_TV_BCP": {
        name: "Beaucoup",
        color: COLOR_BEAUCOUP
    },
    "2P_TV_PASS": {
        name: "Passionnément",
        color: COLOR_PASSIONEMENT
    },
    "2P_TV_FOL": {
        name: "À la folie",
        color: COLOR_A_LA_FOLIE
    },
    "2P_TV_FIB": {
        name: "FIBER 200",
        color: COLOR_A_LA_FOLIE
    },
    "3P_PEU": {
        name: "Un peu",
        color: COLOR_UN_PEU
    },
    "3P_BCP": {
        name: "Beaucoup",
        color: COLOR_BEAUCOUP
    },
    "3P_PASS": {
        name: "Passionnément",
        color: COLOR_PASSIONEMENT
    },
    "3P_FOL": {
        name: "À la folie",
        color: COLOR_A_LA_FOLIE
    },
    "3P_FIB": {
        name: "FIBER 200",
        color: COLOR_FIBER
    },
    "2P_INT_TEL": {
        name: "NET + TEL Un peu",
        color: COLOR_UN_PEU
    },
    "2P_TV_TEL": {
        name: "TV + TEL",
        color: COLOR_DEFAULT_PACK
    },
    "1P_TV": {
        name: "TV",
        color: COLOR_DEFAULT_PACK
    },
    "VINPEU": {
        name: "Un peu",
        color: COLOR_UN_PEU
    },
    "VINBCP": {
        name: "Beaucoup",
        color: COLOR_BEAUCOUP
    },
    "VINPASS": {
        name: "Passionnément",
        color: COLOR_PASSIONEMENT
    },
    "VINFOL": {
        name: "À la folie",
        color: COLOR_A_LA_FOLIE
    },
    "VINFIBER": {
        name: "FIBER 200",
        color: COLOR_FIBER
    },
    "PCUSTO": {
        name: "À la carte",
        color: COLOR_DEFAULT_PACK
    },
    "3P_ONE": {
        image: require('../../assets/img/one-short.png'),
        name: 'one',
        color: COLOR_ONE
    },
    "toudoo": {
        image: require('../../assets/img/toudoo-short.png'),
        name: 'toudou',
        color: COLOR_TOUDOO
    },
    "wahoo": {
        image: require('../../assets/img/wahoo-short.png'),
        name: 'wahoo',
        color: COLOR_WAHOO
    },
    "tatoo": {
        image: require('../../assets/img/tatoo-short.png'),
        name: 'tatoo',
        color: COLOR_TATOO
    },
    "hero": {
        image: require('../../assets/img/hero-short.png'),
        name: 'hero',
        color: COLOR_WAHOO
    }
};

export const getPackMetadata = (packId) => {
    let packImage = null;
    let packColor = COLOR_DEFAULT_PACK;
    let packName = null;
    if (packId && packMetadata[packId]) {
        packImage = packMetadata[packId].image;
        packColor = packMetadata[packId].color;
        packName = packMetadata[packId].name;
    }

    return {
        packImage,
        packColor,
        packName
    };
}