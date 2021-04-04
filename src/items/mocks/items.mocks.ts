export function mockItemsModel(dto: any) {
  this.data = dto;
  this.save = () => {
    return this.data;
  };
}
