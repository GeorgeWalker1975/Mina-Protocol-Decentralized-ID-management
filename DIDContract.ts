import {
  SmartContract,
  method,
  PublicKey,
  Signature,
  Field,
  state,
  State,
  Permissions,
} from 'snarkyjs';

export class DIDContract extends SmartContract {
  @state(PublicKey) owner = State<PublicKey>();
  @state(Field) didHash = State<Field>();

  deploy(args: { zkappKey: PrivateKey }) {
    super.deploy(args);
    this.owner.set(this.sender);
    this.didHash.set(Field.zero);  // Изначально пустой DID
    this.setPermissions({
      editState: Permissions.proofOrSignature(),
      send: Permissions.none(),
      receive: Permissions.none(),
    });
  }

  @method
  createDID(did: Field, signature: Signature) {
    let owner = this.owner.get();
    owner.assertEquals(this.sender);

    // Проверка подписи
    signature.verify(owner, [did]).assertTrue();

    // Обновление DID
    this.didHash.set(did);
  }

  @method
  verifyDID(did: Field): boolean {
    let currentDID = this.didHash.get();
    return currentDID.equals(did);
  }
}
