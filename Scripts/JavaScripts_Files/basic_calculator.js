

const display = document.getElementById("display");
const history = document.getElementById("history");

var calculation = display.textContent;
calculation = 0;
var prevent_more_digits = false;
var prev_expression = ""

function updateAnswer(result, previous = "")
{ 
    display.textContent = result;
    if (previous === "clear")
        prev_expression = "";
    else if (previous != "")
    {
        previous = previous + "=";
        prev_expression = previous;
    }
    console.info(prev_expression);
    history.textContent = prev_expression;

    adjustFontSize();
}

function adjustFontSize() {
  const length = display.textContent.length;
  const text = display.textContent;

  if (!/\d/.test(text)) { /* Fix to check for mathematical symbols and not just digits */
    display.style.fontSize = "30px";
    return;
  }

  let size = 30; // base size

  if (length <= 20) size = 30;
  else size = 24;

  display.style.fontSize = size + "px";
}

updateAnswer(calculation);
var answer,number1,number2,operator,answer1,number1_1,number2_1,f,strLength,val,operator2,number2_2;
var lastElement,lastElementNum,secondLastElement,alphabets,alphabets2,Ifpi;
var counter=0 , memory=0, GSTval = 18, decimalDigits = 5;
var equationInParenthesis,equationBeforeParenthesis,equationAfterParenthesis;
var parsed_alphabet,factorial,c,GSTcheck=0;

function factorialCalculation(str)
{
    str = parseFloat(str);
    let i=1;
    let factorial = 1;
    for(i=1;i<=str;i++)
        {
            factorial = factorial * i;
        }
    str = parseFloat(factorial);
    console.log(factorial);
    return(factorial);
}

function CEClick(event) 
{
    if (event.button === 0) 
        {
            if (calculation.length > 1)
            {
                // Remove the last character if there are multiple characters
                calculation = calculation.slice(0, -1);
            }
            else 
            {
                // Clear the display if it's just one character
                calculation = 0;  
            }
        } 
    else if (event.button === 2)
    { 
        // Clear the entire display to "0"
        calculation = 0;  
    }
    updateAnswer(calculation, "clear");
}

// Adding event listener for mouse clicks
document.getElementById("CE").addEventListener("mousedown", CEClick);

// Prevent the context menu from appearing on right-click
document.getElementById("CE").addEventListener("contextmenu", function(event)
{
    event.preventDefault();
});

function degToRad(degree)
{
    return degree* Math.PI / 180;
}

function parseNumber(str)
{
    let match = str.match(/^[-+]?\d+(\.\d+)?/);

    if (match)
    {
        let numberStr = match[0];
        return numberStr;
    }
    return null;
}
function calculateAnswer(number)
{
    
    answer = number;
    f=0;
    while(f==0)
    {
    console.log(answer);
    parseAlphabets(answer);
    alphabets = parsed_alphabet;
    answer = answer.replace(alphabets,"");
    console.log(answer);
    Ifpi = answer.slice(0,1);
    let number_regux = parseNumber(answer);
    number1 = parseFloat(answer);
    if (number1 == Infinity || number1 == -Infinity) {
        console.error("Infinity");
        f=0;
        return "Infinity";
    }
    if (Math.abs(parseFloat(number1)) > Number.MAX_SAFE_INTEGER) {
        console.error("Overflow");
        f=0;
        return "Overflow";
    }
    if(Ifpi === "π")
    {
        number1 = Math.PI.toFixed(decimalDigits);
        number_regux = "π";
        number = number1;
    }
    else if(Ifpi === "e")
        {
            number1 = Math.E.toFixed(decimalDigits);
            number_regux = "e";
            number = number1;
        }
    answer = answer.replace(number_regux,"");
    console.log(number_regux);
    if(answer === "" && !(alphabets === "sin" || alphabets === "cos" || alphabets === "tan" || alphabets === "log" || alphabets === "ln"))
    {
        if(counter==0)
            val = number;
        f=1;
        break;
    }
    operator = answer.slice(0,1);
    answer = answer.replace(operator,"");
    console.log(answer);
    parseAlphabets(answer);
    alphabets2 = parsed_alphabet;
    answer = answer.replace(alphabets2,"");
    console.log(alphabets2);
    Ifpi = answer.slice(0,1);
    number_regux = parseNumber(answer);
    number2 = parseFloat(answer);
    if (Math.abs(parseFloat(number2)) > Number.MAX_SAFE_INTEGER) {
        console.error("Overflow");
        f=0;
        return "Overflow";
    }
    if (number2 == Infinity || number2 == -Infinity) {
        console.error("Infinity");
        f=0;
        return "Infinity";
    }
    if(Ifpi === "π")
        {
            number2 = Math.PI.toFixed(decimalDigits);
            number_regux = "π";
        }
    else if(Ifpi === "e")
        {
            number2 = Math.E.toFixed(decimalDigits);
            number_regux = "e";
        }
    console.log(number_regux);
    answer = answer.replace(number_regux,"");
    console.log(answer);
    operator2= answer.slice(0,1);
    if((operator === "%" || operator === "!") && number2 < 0)
        answer = "+" + number2 + answer;
    console.log(operator);
    if(alphabets === "sin")
    {
        number1 = Math.sin(degToRad(number1));
        answer1 = number1;
    }
    if(alphabets2 === "sin")
        number2 = Math.sin(degToRad(number2));

    if(alphabets === "cos")
    {
        number1 = Math.cos(degToRad(number1));
        answer1 = number1;
    }
    if(alphabets2 === "cos")
        number2 = Math.cos(degToRad(number2));

    if(alphabets === "tan")
    {
        number1 = Math.tan(degToRad(number1));
        answer1 = number1;
    }
    if(alphabets2 === "tan")
        number2 = Math.tan(degToRad(number2));

    if(alphabets === "log")
    {
        number1 = Math.log10(number1);
        answer1 = number1;
    }
    if(alphabets2 === "log")
        number2 = Math.log10(number2);

    if(alphabets === "ln")
    {
        number1 = Math.log(number1);
        answer1 = number1;
    }
    if(alphabets2 === "ln")
        number2 = Math.log(number2);

    if(operator2 === "%")
    {
        answer = answer.replace(operator2,"");
        number2 = (number2 / 100) * number1;
    }
    else if(operator2 === "!")
    {
            answer = answer.replace(operator2,"");
            number2 = factorialCalculation(number2);
    }  
    if(operator === "+")
        answer1 = number1 + number2;
    else if(operator === "-")
        answer1 = number1 - number2;
    else if(operator === "×")
        answer1 = number1 * number2;
    else if(operator === "÷")
        answer1 = number1 / number2;
    else if(operator === "%")
        answer1 = number1 / 100;
    else if(operator === "!")
        answer1 = factorialCalculation(number1);
    else if(operator === "^") 
        answer1 = Math.pow(number1,number2);
    else if(operator === "√")
        answer1 = Math.pow(number2,1/number1);
    if(answer === "+" || answer === "-")
        answer = answer + number2;
    answer = answer1 + answer;
    val = answer;
    counter ++;
   
    }
}
function clicked(button)
{
    button.classList.toggle('clicked');
    console.log("Hello");
    var number_clicked = button.id;
    calculation = String(calculation);
    var number = parseInt(number_clicked);

    if (calculation.length >= 30) {
    // Allow only control buttons
    if (!(button.id === "CE" || button.id === "=" || button.id === "MC" || button.id === "MR")) {
        return;
    }
    }

    if(!(number_clicked === "M+" || number_clicked === "M-" || number_clicked === "MR" || number_clicked === "MC" || number_clicked === "="))
    {
        if(c > 0 )
            {
                if((number >=0 && number<=9) || c == 2 || number_clicked == "π" || number_clicked == "e")
                    calculation = 0;
                c = 0;
            }
    }
    

    if(number_clicked == 'CE'|| number_clicked == 'GST' || number_clicked == 'MR' || number_clicked == 'MC' || number_clicked == 'M+' || number_clicked == 'M-' || number_clicked == '=' )
       calculation = calculation;
    else
    {
        if(calculation == 0 && ((number >=0 && number <=9) || number_clicked === "sin(" || number_clicked === "cos(" || number_clicked === "tan(" || number_clicked === "log(" || number_clicked === "ln(" || number_clicked === "π" || number_clicked === "e" || number_clicked == "-"))
            calculation = number_clicked;
        else
        {
            lastElement = calculation.slice(-1);
            lastElementNum = String(lastElement);
            if(number_clicked === "π" || number_clicked === "e")
            {
                if((lastElementNum >=0 && lastElementNum<=9) || lastElement === ")" || (lastElement === "(" && !(number_clicked === "sin(" || number_clicked === "cos(" || number_clicked === "tan(" || number_clicked === "log(" || number_clicked === "ln(" || number_clicked === "π" || number_clicked === "e")))
                    calculation = calculation + "×";
                else if(lastElement === "%" || lastElement === "π" || lastElement === "e" || lastElement === "!")
                    calculation = calculation + "×";
                calculation = calculation + number_clicked;
            }
            else if((number>=0 && number<=9))
            {
                if(lastElement === "%" || lastElement === "π" || lastElement === "e" || lastElement === "!")
                    calculation = calculation + "×";
                calculation = calculation + number_clicked;
            }
            else if(number_clicked === "(" || number_clicked === "sin(" || number_clicked === "cos(" || number_clicked === "tan(" || number_clicked === "log(" || number_clicked === "ln(")
            {
                if((lastElementNum >=0 && lastElementNum<=9) || lastElement === ")" || lastElement === "π" || lastElement === "e" || (lastElement ==="!" && number_clicked != "!") ||(lastElement === "(" && !(number_clicked === "sin(" || number_clicked === "cos(" || number_clicked === "tan(" || number_clicked === "log(" || number_clicked === "ln(" || number_clicked === "π" || number_clicked === "e")))
                    calculation = calculation + "×";
                calculation = calculation + number_clicked;
            }
            else
            {
                if((lastElementNum >=0 && lastElementNum<=9) || lastElement === "π" || lastElement === "e" || (number_clicked ==="-" && lastElement !== "-") || number_clicked === "(" || number_clicked === ")" || lastElement === ")" || lastElement === "%" || number_clicked === "sin(" || number_clicked === "cos(" || number_clicked === "tan(" || number_clicked === "log(" || number_clicked === "ln(" || number_clicked ==="π" || number_clicked === "e" || (lastElement === "!" && number_clicked !== "!"))
                    calculation = calculation + number_clicked;
                else 
                {
                    secondLastElement = calculation.slice(-2,-1);
                    if((lastElement === "-" || lastElement === "!") && !((secondLastElement>=0 && secondLastElement<=9) || secondLastElement === "π" || secondLastElement === "e"))
                        calculation = calculation.slice(0,-2);
                    else
                        calculation = calculation.slice(0,-1);
                    calculation = calculation + number_clicked;
                }
            }
        }
    }  
    updateAnswer(calculation);
    
    if(number_clicked === '=')
        {
            equalOperator();
        }
    
    if(number_clicked === "M+")
        {
            equalOperator();
            memory += parseFloat(val);
        }
    else if(number_clicked === "M-")
        {
            equalOperator();
            memory -= parseFloat(val);
        }
    else if(number_clicked === "MR")
        {
            updateAnswer(memory);
            calculation = memory;
        }
    else if (number_clicked === "MC")
        {
            memory = 0;
            updateAnswer(memory);
            calculation = 0;
        }

    if(number_clicked == "GST")
    {
        GSTcheck = 0;
        if((calculation.slice(-1) === "+") || (calculation.slice(-1)==="-"))
        {
            if(calculation.slice(-1) === "+")
                GSTcheck = 1;
            else
                GSTcheck = 2;
            calculation = calculation.slice(0,-1);
        }
        f=0;
        counter =0;
        var response = calculateAnswer(calculation);
        calculation = val;
        if(calculation == "NaN" || calculation == "undefined")
            calculation = "Error! Please enter proper expression";
        else if (response === "Overflow")
            calculation = "Calculation too large";
        else if (response === "Infinity")
            calculation = "Infinity";
        else
        {
            answer = parseFloat(calculation);
            if(GSTcheck == 1)
                calculation = answer + GSTval/100*answer;
            else if(GSTcheck == 2)
                calculation = answer * 100/(100+GSTval);
            else
                calculation = GSTval/100*answer;
        }
        updateAnswer(calculation);
        val = calculation;
        counter = 1;
    }
}
function equalOperator()
{
    f=0;
    checkParenthesisError(calculation);
    if(f===1)
        updateAnswer(calculation);
    if(f==0)
    {
        if(!(calculation.indexOf("(") === -1))
            calculateParethesis(calculation);
        counter = 0;
        let expression = calculation;
        response = calculateAnswer(calculation);
        calculation = val;
        c=1;
        if(calculation == "NaN" || calculation == "undefined")
        {
            calculation = "Error! Please enter proper expression";
            c=2;
        }
        else if (response === "Overflow")
        {
            calculation = "Calculation too large";
            c=2;
        }
        else if (response === "Infinity")
        {
            calculation = "Infinity";
            c=2;
        }
        else
            calculation = parseFloat(parseFloat(calculation).toFixed(decimalDigits));
        updateAnswer(calculation, expression);
    }
    counter = 1;
}

function checkParenthesisError(str) 
{
    let openCount = 0;
    let closeCount = 0;

    for (let i = 0; i < str.length; i++)
    {
        if (str[i] === "(")
        {
            openCount++;
        } else if (str[i] === ")")
        {
            closeCount++;
        }

        // If there's a closing parenthesis before an opening one
        if (closeCount > openCount) 
        {
            f=1;
            calculation = "Error: ')' found before '('";
            c=2;
        }
    }

    // Additional check if there are unmatched parentheses
    if( openCount > closeCount)
    {
        for( let i=0;i<(openCount-closeCount);i++)
            calculation = calculation + ")";
    }
}

function calculateParethesis(equation)
{
    while(!(equation.indexOf("(") === -1))
    {
    removeUntilParenthesis(equation);
    f=0;
    counter =0;
    calculateAnswer(equationInParenthesis);
    equationInParenthesis = val;
    equation = equationBeforeParenthesis + equationInParenthesis + equationAfterParenthesis;
    }
    calculation = equation;
    console.log(equation);
}

function removeUntilParenthesis(str) 
{
    var indexOfOpening = str.lastIndexOf("(");
    var indexOfClosing = str.indexOf(")",indexOfOpening);

    equationInParenthesis = str.slice(indexOfOpening,indexOfClosing);
    equationInParenthesis = equationInParenthesis.replace("(","");
    equationBeforeParenthesis = str.slice(0,indexOfOpening);
    equationAfterParenthesis = str.slice((indexOfClosing+1));
}

function parseAlphabets(str) 
{
    parsed_alphabet = ""; 
    let i = 0;        

    while (i < str.length)
    {
        let currentChar = str[i];

        if (/[a-z]/.test(currentChar) && currentChar != "e") 
        {
            parsed_alphabet += currentChar;
        } 
        else 
        {
            break;
        }
        i++;
    }

}

function toggleSettings() 
{
    var panel = document.getElementById("settingsPanel");
    panel.classList.toggle("active");
    console.log("active");
    if (panel.classList.contains("active")) 
    {
        document.addEventListener("click", handleClickOutside, true);
    } else
    {
        document.removeEventListener("click", handleClickOutside, true);
    }
}

function handleClickOutside(event) 
{
    var panel = document.getElementById("settingsPanel");
    if (!panel.contains(event.target) && !event.target.matches("button")) {
        panel.classList.remove("active");
        document.removeEventListener("click", handleClickOutside, true); // Remove listener after hiding
    }
}

let isUserChanged = false; 

function setDefaultValue()
    {
        const gstInput = document.getElementById('GSTval');
        if (!isUserChanged) 
        {
            gstInput.value = '18';  
        }
    }

function validateInput()
    {
        const gstInput = document.getElementById('GSTval');
        const errorMessage = document.getElementById('error');
        const value = parseFloat(gstInput.value);

        if (isNaN(value) || value < 0) 
        {
            errorMessage.textContent = 'Please enter a valid number.';
            isUserChanged = false;
        } 
        else 
        {
            errorMessage.textContent = ''; 
            isUserChanged = true; 
        }
    }

function resetInput() 
    {
        const gstInput = document.getElementById('GSTval');
        if (!isUserChanged || gstInput.value === '') {
            gstInput.value = '18';
        }
        GSTval = Number(gstInput.value);
        isUserChanged = true;
    }

    document.getElementById('GSTval').addEventListener('blur', resetInput);

    function setDefaultValue2()
    {
        const decimalInput = document.getElementById('DecimalDigits');
        if (!isUserChanged) 
        {
            decimalInput.value = '5';  
        }
    }

function validateInput2()
    {
        const decimalInput = document.getElementById('DecimalDigits');
        const errorMessage = document.getElementById('error2');
        const value = parseFloat(decimalInput.value);

        if (isNaN(value) || value < 0 || value > 15) 
        {
            errorMessage.textContent = 'Please enter a valid number.';
            isUserChanged = false;
        } 
        else 
        {
            errorMessage.textContent = ''; 
            isUserChanged = true; 
        }
    }

function resetInput2() 
    {
        const decimalInput = document.getElementById('DecimalDigits');
        if (!isUserChanged || decimalInput.value === '') {
            decimalInput.value = '5';
        }
        decimalDigits = Number(decimalInput.value);
        isUserChanged = true;
    }

    document.getElementById('DecimalDigits').addEventListener('blur', resetInput2);


function checkEnter(event) 
{
    // Check if the pressed key is Enter
    if (event.key === "Enter") 
    {
        equalOperator();
        console.log(calculation);
        updateAnswer(calculation);
    }
}

    // Adding the event listener when the document is fully loaded
    document.addEventListener("DOMContentLoaded", function() {
        document.addEventListener("keydown", checkEnter);
    });
