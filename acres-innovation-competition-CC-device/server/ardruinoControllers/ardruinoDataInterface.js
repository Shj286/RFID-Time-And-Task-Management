
module.exports = class ArdruinoDataInterface{

    static inputData = ""
    static outputData;


    static writeToTag(){
        return `00${this.inputData}`
    }
    static readFromTag(input){
        let result = ""
        for(let i = 0; i <input.length; i++){
            
              switch (input[i]) {
                case "A":
                  result += "A";
                  break;
                case "B":
                  result += "B";
                  break;
                case "C":
                  result += "C";
                  break;
                case "D":
                  result += "D";
                  break;
                case "E":
                  result += "E";
                  break;
                case "F":
                  result += "F";
                  break;
                case "G":
                  result += "G";
                  break;
                case "H":
                  
                  result += "H";
                  break;
                case "I":
                  
                  result += "I";
                  break;
                case "J":
                  
                  result += "J";
                  break;
                case "K":
                  
                  result += "K";
                  break;
                case "L":
                  
                  result += "L";
                  break;
                case "M":
                  
                  result += "M";
                  break;
                case "N":
                  
                  result += "N";
                  break;
                case "O":
                  
                  result += "O";
                  break;
                case "P":
                  
                  result += "P";
                  break;
                case "Q":
                  
                  result += "Q";
                  break;
                case "R":
                  
                  result += "R";
                  break;
                case "S":
                  
                  result += "S";
                  break;
                case "T":
                  
                  result += "T";
                  break;
                case "U":
                  
                  result += "U";
                  break;
                case "V":
                  
                  result += "V";
                  break;
                case "W":
                  
                  result += "W";
                  break;
                case "X":
                  
                  result += "X";
                  break;
                case "Y":
                  
                  result += "Y";
                  break;
                case "Z":
                  
                  result += "Z";
                  break;
                case "a":
                  
                  result += "a";
                  break;
                case "b":
                  
                  result += "b";
                  break;
                case "c":
                  
                  result += "c";
                  break;
                case "d":
                  
                  result += "d";
                  break;
                case "e":
                  
                  result += "e";
                  break;
                case "f":
                  
                  result += "f";
                  break;
                case "g":
                  
                  result += "g";
                  break;
                case "h":
                  
                  result += "h";
                  break;
                case "i":
                  
                  result += "i";
                  break;
                case "j":
                  
                  result += "j";
                  break;
                case "k":
                  
                  result += "k";
                  break;
                case "l":
                  
                  result += "l";
                  break;
                case "m":
                  
                  result += "m";
                  break;
                case "n":
                  
                  result += "n";
                  break;
                case "o":
                  
                  result += "o";
                  break;
                case "p":
                  
                  result += "p";
                  break;
                case "q":
                  
                  result += "q";
                  break;
                case "r":
                  
                  result += "r";
                  break;
                case "s":
                  
                  result += "s";
                  break;
                case "t":
                  
                  result += "t";
                  break;
                case "u":
                  
                  result += "u";
                  break;
                case "v":
                  
                  result += "v";
                  break;
                case "w":
                  
                  result += "w";
                  break;
                case "x":
                  
                  result += "x";
                  break;
                case "y":
                  
                  result += "y";
                  break;
                case "z":
                  
                  result += "z";
                  break;
                case "1":
                  
                  result += "1";
                  break;
                case "2":
                  
                  result += "2";
                  break;
                case "3":
                  
                  result += "3";
                  break;
                case "4":
                  
                  result += "4";
                  break;
                case "5":
                  
                  result += "5";
                  break;
                case "6":
                  
                  result += "6";
                  break;
                case "7":
                  
                  result += "7";
                  break;
                case "8":
                  
                  result += "8";
                  break;
                case "9":
                  
                  result += "9";
                  break;
              }
            }
            

        
        return `${result}`.valueOf()
    }
    
}