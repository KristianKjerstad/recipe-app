export interface SignatureData {
    oppslagsData: OppslagsData
    status: Status
    enhet: Enhet
    signeringsGrunnlag: SigneringsGrunnlag
    signeringsKombinasjon: SigneringsKombinasjon
    _links: Links3
}

export interface OppslagsData {
    oppslagsTidspunkt: string
    oppslagsIdent: string
}

export interface Status {
    rutineStatus: RutineStatus
    kombinasjonStatus: KombinasjonStatus
    regelStatus: RegelStatus
}

export interface RutineStatus {
    kode: string
    tekstforklaring: string
}

export interface KombinasjonStatus {
    kode: string
    tekstforklaring: string
}

export interface RegelStatus {
    kode: string
    tekstforklaring: string
    regelIdent: string
}

export interface Enhet {
    organisasjonsnummer: string
    navn: string
    organisasjonsform: Organisasjonsform
    konkurs: string
    underAvvikling: string
    underTvangsavviklingEllerTvangsopplosning: string
    _links: Links2
}

export interface Organisasjonsform {
    kode: string
    beskrivelse: string
    _links: Links
}

export interface Links {
    self: Self
}

export interface Self {
    href: string
}

export interface Links2 {
    self: Self2
}

export interface Self2 {
    href: string
}

export interface SigneringsGrunnlag {
    kode: string
    tekstforklaring: string
    signaturProkuraRoller: SignaturProkuraRoller
    muligeSigneringsRoller: MuligeSigneringsRoller
}

export interface SignaturProkuraRoller {
    signaturProkuraFritekst: string
}

export interface MuligeSigneringsRoller {
    personRolleGrunnlag: PersonRolleGrunnlag[]
}

export interface PersonRolleGrunnlag {
    fodselsdato: string
    navn: string
    rolle: Rolle
}

export interface Rolle {
    kode: string
    tekstforklaring: string
}

export interface SigneringsKombinasjon {
    kombinasjon: Kombinasjon[]
}

export interface Kombinasjon {
    kode: string
    tekstforklaring: string
    kombinasjonsId: string
    personRolleKombinasjon: PersonRolleKombinasjon[]
}

export interface PersonRolleKombinasjon {
    fodselsdato: string
    navn: string
    rolle: Rolle2
}

export interface Rolle2 {
    kode: string
    tekstforklaring: string
}

export interface Links3 {
    self: Self3
}

export interface Self3 {
    href: string
}
