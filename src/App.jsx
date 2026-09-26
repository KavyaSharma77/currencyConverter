import { use, useState } from 'react'
import InputBox from './components/InputBox'
import UseCurrencyInfo from './hooks/usecurrencyInfo'
import './App.css'

function App() {
  const[amount,setAmount] = useState(0);
  const[from,setFrom] = useState("usd");
  const[to,setTo] = useState("inr");
  const[convertedAmount,setconvertedAmount] = useState(0)

  const currencyInfo = UseCurrencyInfo(from)
  
  const options = Object.keys(currencyInfo);

  const swap = (()=>{
    setFrom(to)
    setTo(from)
    setconvertedAmount(amount)
    setAmount(convertedAmount)
  })

  const convert = () =>{
    setconvertedAmount(amount * currencyInfo[to])
  }



  return (
    <div
        className="w-full h-screen flex justify-center items-center bg-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://i.pinimg.com/1200x/2c/2d/87/2c2d87548f0f50f8db4e2c3f8b3b836b.jpg')`,
        }}
    >
        <div className="w-full max-w-md px-4">

            {/* Heading */}
            <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-white">
                    Currency <span className="text-[#D4A72C]">Converter</span>
                </h1>
                <p className="text-white/70 mt-2">
                    Convert currencies quickly and easily
                </p>
            </div>

            {/* Converter Box */}
            <div className="border border-[#D4A72C]/60 rounded-2xl p-6 bg-[#18181B]/90 shadow-2xl">

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert();
                    }}
                >
                    <div className="w-full mb-2">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onAmountChange={(amount) => setAmount(amount)}
                            onCurrencyChange={(currency) => {
                                setFrom(currency);
                            }}
                            selectCurrency={from}
                        />
                    </div>

                    {/* Swap Button */}
                    <div className="relative w-full h-5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#D4A72C] rounded-full bg-[#D4A72C] text-black px-4 py-1 font-semibold"
                            onClick={swap}
                        >
                            ⇅
                        </button>
                    </div>

                    <div className="w-full mt-2 mb-5">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) =>
                                setTo(currency)
                            }
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#D4A72C] hover:bg-[#e0b83f] text-black font-semibold px-4 py-3 rounded-lg"
                    >
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>

            </div>
        </div>
    </div>
);
 
}

export default App
