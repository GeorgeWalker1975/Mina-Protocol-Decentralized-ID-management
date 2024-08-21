import React, { useState } from 'react';
import { PublicKey, Signature, Field } from 'snarkyjs';
import { Mina, DIDContract } from './mina';

function DIDApp() {
  const [did, setDID] = useState('');
  const [signature, setSignature] = useState('');
  const [contract, setContract] = useState(null);

  const createDID = async () => {
    const didField = Field.fromString(did);
    const sig = Signature.fromString(signature);
    await contract.createDID(didField, sig);
    alert('DID was created!');
  };

  const verifyDID = async () => {
    const didField = Field.fromString(did);
    const isValid = await contract.verifyDID(didField);
    alert(isValid ? 'DID valid!' : 'DID not valid.');
  };

  return (
    <div>
      <h1>DID Manager</h1>
      <input
        type="text"
        placeholder="Enter DID"
        value={did}
        onChange={(e) => setDID(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter signature"
        value={signature}
        onChange={(e) => setSignature(e.target.value)}
      />
      <button onClick={createDID}>Создать DID</button>
      <button onClick={verifyDID}>Проверить DID</button>
    </div>
  );
}

export default DIDApp;
