import React, { useState, useEffect } from 'react';
import bitcoin from './../assets/bitcoin.jpg'
import bitcoin_bg from './../assets/bitcoin_bg.webp'
import { CRYPTOCURRENCY_LIST,CONVERT_API } from '../constant/constant';
import { Audio } from 'react-loader-spinner'


const CurrencyConverter = () => {
  // State for form inputs
  const [sourceCrypto, setSourceCrypto] = useState('');
  const [amount, setAmount] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('usd');

  // State for conversion result
  const [convertedAmount, setConvertedAmount] = useState(null);

  // State for error handling
  const [error, setError] = useState(null);

  // State for cryptocurrency options
  const [cryptoOptions, setCryptoOptions] = useState([]);

  // State for set loader
  const [loader,setLoader] = useState(false);
  
  const getCryptoCurrencyList=async()=>{
    try {
    const result=await fetch(CRYPTOCURRENCY_LIST);
    const response=await result.json()
    console.log(response,'response');
    setCryptoOptions(response.topCryptos)
    } catch (error) {
    console.log('error');
    setError('Error converting currency. Please try again.');
    }
  }
  useEffect(() => {
   getCryptoCurrencyList();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    try {
      // Perform currency conversion using API
      setLoader(true);
      if(sourceCrypto==''){
        setError('please choose sourceCrypto!!');
        setLoader(false);
        return;
      }else if(amount==''){
        setError('please fill amount!!');
        setLoader(false);
        return;
      }
      const response = await fetch(`${CONVERT_API}?sourceCrypto=${sourceCrypto}&amount=${amount}&targetCurrency=${targetCurrency}`);
      const data = await response.json();
      console.log(data,'data');
      setConvertedAmount(data.convertedAmount);
      setError(null);
      setLoader(false);
    } catch (error) {
      console.error('Error converting currency:', error);
      setConvertedAmount(null);
      setError('Error converting currency. Please try again.');
      setLoader(false);
    }
  };

  return (
    <div>
      <div className="bg-blue-400 text-2xl font-semibold font-serif w-screen text-white p-3">Currency Converter </div>
      <div className='shadow-lg shadow-blue-700 rounded-lg m-10 flex flex-col gap-5 p-5' style={{ backgroundImage: `url(${bitcoin_bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <label className='text-xl text-white font-medium'>Source Cryptocurrency</label>
          <select
            id="sourceCrypto"
            value={sourceCrypto}
            className='text-l bg-inherit text-black rounded-lg font-medium bg-white pl-5'
            onChange={(e) => setSourceCrypto(e.target.value)}
            required
          >
            <option value="" disabled>Select source cryptocurrency</option>
            {cryptoOptions.map(crypto => (
              <option key={crypto.id} value={crypto.id}>{crypto.name}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <label className='text-xl text-white font-medium'>Amount</label>
          <input
            type="number"
            id="amount"
            className='text-l bg-inherit text-black rounded-lg font-medium bg-white pl-5'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <label className='text-xl text-white font-medium'>Target Currency</label>
          <select
            id="targetCurrency"
            value={targetCurrency}
            className='text-l bg-inherit text-black rounded-lg font-medium bg-white pl-5'
            onChange={(e) => setTargetCurrency(e.target.value)}
            required
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            {/* Add other currencies as needed */}
          </select>
        </div>
        {loader && <Audio sx={{color:"white"}}/>}
        {!loader && <button type="submit" className="bg-blue-600 text-white rounded-full text-xl font-medium w-44 text-center justify-center" onClick={() => { handleSubmit(); }}>Convert</button>}
        {convertedAmount !== null && (
          <p className='grid grid-cols-1 sm:grid-cols-2'><span className="text-xl text-white font-medium font-serif">Converted Amount:</span> <span className='text-l font-bold border-2 bg-white text-black pl-5 rounded-lg'>{convertedAmount} {targetCurrency.toUpperCase()}</span></p>
        )}
        {error && <p className="error text-red-600 text-xl text-center justify-center flex font-semibold font-serif">{error}</p>}
      </div>
    </div>
  );
};

export default CurrencyConverter;
