const TIME_ZONE = "America/Argentina/Buenos_Aires"; 

const PUBLICATION_HOUR = 20; 

// ======================================== 
// // OBTENER PARTES DE FECHA EN ARGENTINA 
// ======================================== 
function getArgentinaDateParts(
  date: Date
) { 
  const formatter = 
    new Intl.DateTimeFormat("en-US", { 
      timeZone: TIME_ZONE,
      year: "numeric", 
      month: "2-digit", 
      day: "2-digit", 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit", 
      hour12: false, 
    }); 
    
  const parts = 
    formatter.formatToParts(date); 
    
  const values = 
    Object.fromEntries( 
      parts.map((part) => [part.type, part.value]) 
    ); 
    
  return { 
    year: Number(values.year), 
    month: Number(values.month), 
    day: Number(values.day), 
    hour: Number(values.hour), 
    minute: Number(values.minute), 
    second: Number(values.second), 
  }; 
}

// ======================================== 
// // CREAR UNA FECHA A LAS 20:00 DE ARGENTINA
// ======================================== 
function createArgentinaDate( 
  year: number, 
  month: number, 
  day: number, 
  hour: number 
): Date { 
  /* 
    Argentina actualmente utiliza UTC-3. 
    Por lo tanto: 20:00 Argentina = 23:00 UTC.
    Construimos primero la fecha como UTC 
    y luego sumamos las 3 horas correspondientes.
  */ 
  return new Date( 
    Date.UTC( 
      year, month - 1, 
      day, 
      hour + 3, 
      0, 
      0, 
      0 
    ) 
  ); 
} 

// ======================================== 
// INICIO DEL PERÍODO ACTUAL 
// ======================================== 
export function getCurrentPublicationPeriodStart( 
  date = new Date() 
): Date { 
  const { 
    year,
    month, 
    day, 
    hour, 
  } = getArgentinaDateParts(date); 
  
  /* 
    Antes de las 20:00: El período actual comenzó ayer a las 20:00. 
    Desde las 20:00: * * El período actual comenzó hoy a las 20:00. 
  */ 
  const periodDate = 
    new Date( 
      Date.UTC(
        year, 
        month - 1, 
        day) 
      ); 
      
    if (hour < PUBLICATION_HOUR) { 
      periodDate.setUTCDate( 
        periodDate.getUTCDate() - 1 
      ); 
    } 
    
  return createArgentinaDate( 
    periodDate.getUTCFullYear(), 
    periodDate.getUTCMonth() + 1, 
    periodDate.getUTCDate(),
    PUBLICATION_HOUR 
  ); 
} 

// ======================================== 
// INICIO DEL PRÓXIMO PERÍODO 
// ======================================== 
export function getNextPublicationPeriodStart( 
  date = new Date() 
): Date { 
  const currentPeriod = getCurrentPublicationPeriodStart(date); 

  /* 
    Sumamos exactamente un día al período actual.
    Ejemplo: 04/08 20:00 * ↓ * 05/08 20:00 
  */ 
  const nextPeriod = 
    new Date(currentPeriod); 
    
  nextPeriod.setUTCDate( 
    nextPeriod.getUTCDate() + 1 
  ); 
  
  return nextPeriod; 
}