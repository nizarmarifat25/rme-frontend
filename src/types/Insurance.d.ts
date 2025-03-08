interface IInsurance {
    name: string;
    code: string;
    contact: string;
    email: string;
    insurance_id?: string;
    is_active?: Boolean | Number
}


export type { IInsurance };
