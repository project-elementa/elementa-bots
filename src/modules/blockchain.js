import * as BC from '../assets/abis.js';
import Caver from 'caver-js';
import dotenv from 'dotenv';
import sharp from 'sharp';

dotenv.config();

const caver = new Caver(process.env.EN_NODE);
const diamond_contract = new caver.klay.Contract(BC.diamondABI, BC.diamondAddress);


export const getData = async () => {
    const data = await diamond_contract.methods.getContract('nft').call();
    return data;
}

const parseDataUri = (dataUri)  => {
    try {
        const base64Data = dataUri.split(',')[1];
        const jsonString = Buffer.from(base64Data, 'base64').toString('utf8');
        const data = JSON.parse(jsonString);
        return data;
    } catch (error) {
        console.error('Data URI 파싱 중 오류 발생:', error);
        return null;
    }
}


export const getNFT = async (tokenId) => {
    const data = await diamond_contract.methods.nft_getUri(tokenId).call();
    const res = await parseDataUri(data)

    return res
}
