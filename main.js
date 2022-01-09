// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

function pAequorFactory (specimenNum, dna) {
  const pAequor = {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      // Generate a random mutation within this organism
      const mutationIndex = Math.floor(Math.random() * this.dna.length); // Location of mutation
      let mutatedDNA = this.dna[mutationIndex];
      while (mutatedDNA === this.dna[mutationIndex]) { 
      // Randomly generate DNA base until different from the original DNA base at this index
        mutatedDNA = returnRandBase();
      }
      this.dna.splice(mutationIndex,1,mutatedDNA); // Update DNA string with mutation
    },
    compareDNA(newpAequor) { // Compare DNA between this organism and new organism
      let totalSimilar = 0;
      for (let i = 0; i < newpAequor.dna.length; i++) { // Check for variances between DNA strands
        if (this.dna[i] === newpAequor.dna[i]) {
          totalSimilar++;
        }
      }
      const matchPerc = Number(((totalSimilar/newpAequor.dna.length)*100).toFixed(2));
      // console.log('Specimen', this.specimenNum, 'and specimen', newpAequor.specimenNum, 'have',matchPerc,'% DNA in common.');
      return matchPerc;
    },
    willLikelySurvive () {
      // Return true if 60% or more of the DNA is 'C' or 'G' 
      let goodDNACount = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          goodDNACount++;
        }
      }
      return (goodDNACount/this.dna.length >= 0.60);
    },
    complementStrand () {
      // Generate complementary DNA strand 
      // Substitutions: A -> T, T -> A, C -> G, G -> C
      const newStrand = this.dna.map(dna => {
        switch (dna) {
          case 'A':
            return 'T';
            break;
          case 'T':
            return 'A';
            break;
          case 'G':
            return 'C';
            break;
          case 'C':
            return 'G';
            break;
        }
      });
      return newStrand;
    },
    findRelated (samplesArr, num) {
      /* Find "num" instaces of pAequor most closely related to this instance
         Accepts an array of pAequor samples for comparison
         When searching, evaluates each entry in samplesArr by getting the match percentage
         then comparing it to the current list of best matches. 
         If the entry is found to be a better match, then it is inserted into the array
         If the entry is not greater than any matches, it is inserted at the end of the array
         After the better match comparison, the last entry is removed from the match Array
      */   
      let comparisonArr = []; // Will be used to store the best matches
       for (let i = 0; i < samplesArr.length; i++) {
        const obj = { // get specimen name and match % for comparison
          specimenNum: samplesArr[i].specimenNum,
          match: this.compareDNA(samplesArr[i]),
          dna: samplesArr[i].dna
        }
        // Iterate over the existing comparison Array. If the existing specimen is a better match, insert into the comparison Array. 
        let found = false;
        let j = 0;
        do {
          if (j === comparisonArr.length) { // If less than the all matches in the array, add at the end and move on
            comparisonArr[j] = obj;
            found = true;
          } else {
            // If value is greater than the current index of the comparison array, insert at current location
            // Inserting at the current location ensures that the comparison array is sorted by best to worst match
            if (obj.match > comparisonArr[j].match && obj.specimenNum !== this.specimenNum) { 
              comparisonArr.splice(j,0,obj); 
              found = true;
            }
          }
          j++;
        } while (!found);
        if (comparisonArr.length > num) { // Erase entries above the number needed
          comparisonArr.pop();
        }
      }
      return comparisonArr;
    }
  } 
  return pAequor;
}

function generatePopulation (num) {
  // Create surviving instances of pAequor
  let organismArr = [];
  let i = 0;
  while (organismArr.length < num) { 
    const sampleName = ('Sample ' + (i + 1));
    do {
      organismArr[i] = pAequorFactory(sampleName, mockUpStrand()); 
    } while (!organismArr[i].willLikelySurvive()); // Generate dna strands until likely survival = true
    i++;
  }
  return organismArr;
}

// Tests
pAequorArray = generatePopulation(30) // Generate 30 instances of surviving pAequor
console.log('Mutate test:');
console.log(pAequorArray[14].specimenNum,pAequorArray[14].dna)
pAequorArray[14].mutate();
console.log(pAequorArray[14].specimenNum,pAequorArray[14].dna)
console.log();
console.log('Comparison test:');
console.log(pAequorArray[10].specimenNum,pAequorArray[10].dna)
console.log(pAequorArray[23].specimenNum,pAequorArray[23].dna)
console.log('Shared DNA:',pAequorArray[10].compareDNA(pAequorArray[23]));
console.log();
console.log('Survival test:')
console.log(pAequorArray[4].specimenNum,pAequorArray[4].dna)
console.log('Will likely survive?', pAequorArray[4].willLikelySurvive());
console.log();
console.log('Complement test');
console.log(pAequorArray[29].specimenNum,pAequorArray[29].dna);
console.log(pAequorArray[29].specimenNum,pAequorArray[29].complementStrand());
console.log();
console.log('Find related:');
console.log(pAequorArray[7].specimenNum,pAequorArray[7].dna);
console.log(pAequorArray[7].findRelated(pAequorArray, 5));
