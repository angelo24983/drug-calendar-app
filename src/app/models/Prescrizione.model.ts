export interface Prescrizione {
    id: string;
    assegnatario: 'Giulia' | 'Anna';
    farmaco: string;
    quantita: string;
    da: Date;
    a: Date;
    turno: string[];
    done: boolean;
}