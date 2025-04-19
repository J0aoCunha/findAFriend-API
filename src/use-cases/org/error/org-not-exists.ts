class OrgNotExists extends Error{
  constructor(){
    super('Org not exists');
  }
}

export { OrgNotExists };
