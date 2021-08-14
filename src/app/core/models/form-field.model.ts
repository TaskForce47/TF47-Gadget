interface Information {
  displayName?: string;
  name?: string;
}

interface View {
  readonly?: boolean;
  disabled?: boolean;
}


export class FormFieldModel {
  public dataType: string;
  public view: View;
  public information: Information;
}
