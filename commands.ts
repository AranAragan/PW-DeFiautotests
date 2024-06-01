import axios from "axios"; 
import * as fs from 'fs';
 
const url = "https://api.yetanotherdefi.com/v2" 
 
export default class Tokens { 
 
    constructor() { 
 
    } 
 
    static async GetTokens(allarray:boolean =false, indexForFirstAddress: number = 0, indexForSecondAddress: number = 1) { 
        let config = {  
            url: url + "/tokens/list",
            method: 'post',
            data: {filter: {chain_ids: [1],is_active: true},paging: {page: 1}},
            headers: { "Accept-Encoding": "*" } 
        }; 
        let _arrayAddress: string[] = [] 
        let _response: any 
        try { 
            _response = await axios(config); 
           if (allarray==false){
            for (indexForFirstAddress; indexForFirstAddress <= indexForSecondAddress; indexForFirstAddress++) { 
                let elem: string = await _response.data.tokens[indexForFirstAddress].address 
                _arrayAddress.push(elem) 
            } }
            else{_arrayAddress = await _response.data.tokens
            fs.writeFileSync('test.json', JSON.stringify(_arrayAddress))};
            return _arrayAddress 
 
        } 
        catch (err: any) { 
 
            _response = err.response; 
            return _response; 
        } 

    } 

    static async eToNumber(num: any ) {
        let sign = "";
        (num += "").charAt(0) == "-" && (num = num.substring(1), sign = "-");
        let arr = num.split(/[e]/ig);
        if (arr.length < 2) return sign + num;
        let dot = (.1).toLocaleString().substr(1, 1), n = arr[0], exp = +arr[1],
            w = (n = n.replace(/^0+/, '')).replace(dot, ''),
          pos = n.split(dot)[1] ? n.indexOf(dot) + exp : w.length + exp,
          L: any = pos - w.length, s = "" + BigInt(w);
          w   = exp >= 0 ? (L >= 0 ? s + "0".repeat(L) : r()) : (pos <= 0 ? "0" + dot + "0".repeat(Math.abs(pos)) + s : r());
        L= w.split(dot); if (L[0]==0 && L[1]==0 || (+w==0 && +s==0) ) w = 0; //** added 9/10/2021
        return sign + w;
        function r() {return w.replace(new RegExp(`^(.{${pos}})(.)`), `$1${dot}$2`)}
      }

}

Tokens.GetTokens(true)