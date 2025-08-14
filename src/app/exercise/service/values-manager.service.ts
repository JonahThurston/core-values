import { Injectable, signal } from '@angular/core';
import { CoreValue } from './core-value';
import { Observable, of } from 'rxjs';
import { ValueBucket } from './value-bucket';

//TS doesnt have a built in shuffle function :( I fully stole this from stackoverflow. Looks like it should work just fine tho. 
function shuffle(array : string[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {

    // This line is so rad. I'm mostly just trusting that math means this is a balanced selection. But I do see why it gets a number between 0 and length.
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    //also this swap is witchcraft. Ts is so cool
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

@Injectable({
  providedIn: 'root'
})
export class ValuesManagerService {
  private userVals: CoreValue[];
  public userBuckets = signal<ValueBucket[]>([
    {id: 0, name: 'Name not set', color: 'red', values: []},
    {id: 1, name: 'Name not set', color: 'red', values: []},
    {id: 2, name: 'Name not set', color: 'red', values: []},
  ])
  
  constructor() { 
    shuffle(valueArray);
    this.userVals = valueArray.map((value, index) => ({
    // shuffle(testArray)
    // this.userVals = testArray.map((value, index) => ({
        id: index,
        value: value,
        trashed: false
      }));
    }
    
    getValsLength(): number {
      return this.userVals.length;
    }
    
    getValAt(index : number): CoreValue{
    const val = this.userVals.at(index);
    if (val === undefined){
      throw new Error(`Tried to access invalid idex: ${index}`)
    } else{
      return val;
    }
  }
  
  setTrashed(index: number, trashed: boolean): void{
    if (index >= 0 && index < this.userVals.length){
      this.userVals[index].trashed = trashed;
    } else {
      throw new Error(`Tried to access invalid idex: ${index}`);
    }
  }
  
  getPercentTrashed(): number{
    const length = this.userVals.length
    const numTrashed = this.userVals.filter(value => value.trashed).length
    return length === 0 ? 0 : (numTrashed / length) * 100
  } 
  
  //first time trying observables! Theyre kinda rad!
  getValsObservable(): Observable<CoreValue[]> {
    //So basically this of thing turns an array into an observable. If I was using an http.get it would already be observable and I wouldnt need an array
    return of(this.userVals);
  }

  getNextNotTrashedId(currIndex: number): number{
    for (let i = currIndex + 1; i < this.userVals.length; i++) {
      if (!this.userVals[i].trashed){
        return i;
      }
    }
    return -1;
  }
  
  createBucket(){
    const lastId = this.userBuckets().length > 0
    ? Math.max(...this.userBuckets().map(bucket => bucket.id))
    : -1;

    if (this.userBuckets().length > 7) {
      return;
    }
    
    let newBucket: ValueBucket = {
      id: lastId + 1,
      name: 'Name not set',
      color: 'red',
      values: []
    }
    
    this.userBuckets.update(oldBuckets => {
      oldBuckets.push(newBucket);
      return oldBuckets;
    });
  }
  
  deleteBucket(idToDelete: number){
    const originalLength = this.userBuckets().length;

    if (originalLength <= 3) {
      return;
    }

    this.userBuckets.update((oldBuckets) => oldBuckets.filter(bucket => bucket.id !== idToDelete));
    
    if (this.userBuckets().length === originalLength) {
      console.warn(`Bucket with id ${idToDelete} not found.`);
    }
  }

  addToBucket(valToAdd: CoreValue, givenBucket: ValueBucket) {
    const alreadyExistsAt = givenBucket.values.findIndex(value => value.id === valToAdd.id)
    if (alreadyExistsAt != -1){
      return;
    }

    givenBucket.values.push(valToAdd);
    this.userBuckets.update(oldArray => {
      const newArray = [...oldArray];
      newArray[givenBucket.id] = givenBucket;
      return newArray;
    });
  }

  trashValFromBucket(valToDelete: CoreValue, bucket: ValueBucket) {
    const foundAt = bucket.values.findIndex(value => value.id === valToDelete.id)
    if (foundAt === -1){
      console.error(`Tried to delete val from bucket it was not it: ${valToDelete.id}`)
      return;
    }

    this.setTrashed(valToDelete.id, true);

    bucket.values.splice(foundAt, 1);
    this.userBuckets.update(oldArray => {
      const newArray = [...oldArray];
      newArray[bucket.id] = bucket;
      return newArray;
    })
  }

  switchBuckets(valToSwitch: CoreValue, oldBucket: ValueBucket, newBucket: ValueBucket) {
    const oldBucketIndex = oldBucket.values.findIndex(value => value.id === valToSwitch.id)
    if (oldBucketIndex === -1){
      console.warn(`tried to bucket switch a value that couldn't be found in the original bucket. id: ${valToSwitch.id}`)
      return
    }
    const newBucketIndex = newBucket.values.findIndex(value => value.id === valToSwitch.id)
    if (newBucketIndex != -1){
      console.warn(`tried to bucket switch a value that was already in the new bucket. id: ${valToSwitch.id}`)
      return
    }

    oldBucket.values.splice(oldBucketIndex, 1);
    newBucket.values.push(valToSwitch);
    this.userBuckets.update(oldArray => {
      const newArray = [...oldArray];
      newArray[oldBucket.id] = oldBucket;
      newArray[newBucket.id] = newBucket
      return newArray;
    });
  }
  
  getAllBuckets() {
    return this.userBuckets();
  }

  getBucketSignal() {
    return this.userBuckets;
  }
}

// const testArray = [
//   "Entrepreneurship Entrepreneurship1", "Entrepreneurship Entrepreneurship2", "Entrepreneurship Entrepreneurship3", "Entrepreneurship Entrepreneurship4", "Entrepreneurship Entrepreneurship5"
// ]

const valueArray = [
  "Abundance",
  "Acceptance",
  "Accountability",
  "Accuracy",
  "Achievement",
  "Adaptability",
  "Adventure",
  "Affection",
  "Alignment",
  "Alone Time",
  "Altruism",
  "Anti-Racism",
  "Appreciation",
  "Artistry",
  "Autonomy",
  "Authenticity",
  "Awareness",
  "Balance",
  "Beauty",
  "Belonging",
  "Bliss",
  "Boldness",
  "Bravery",
  "Calmness",
  "Caring",
  "Change",
  "Change the World",
  "Charisma",
  "Charity",
  "Clarity",
  "Cleanliness",
  "Clear Communication",
  "Cleverness",
  "Community",
  "Compassion",
  "Confidence",
  "Consciousness",
  "Consistency",
  "Contentment",
  "Contribution",
  "Cooperation",
  "Courage",
  "Creativity",
  "Credibility",
  "Curiosity",
  "Decisiveness",
  "Dedication",
  "Deep Connections",
  "Dependability",
  "Dignity",
  "Efficiency",
  "Empathy",
  "Encouragement",
  "Enthusiasm",
  "Entrepreneurship",
  "Environmental Protection",
  "Equity",
  "Equality",
  "Excellence",
  "Expansion",
  "Experimentation",
  "Exploration",
  "Fairness",
  "Faith",
  "Fame",
  "Family ",
  "Fidelity",
  "Financial Security",
  "Finesse",
  "Forgiveness",
  "Freedom",
  "Friendliness",
  "Friendship",
  "Fun",
  "Generosity",
  "Gentleness",
  "Going with the Flow",
  "Goodness",
  "Grace ",
  "Gracefulness",
  "Gratitude",
  "Happiness",
  "Harmony",
  "Health",
  "Honesty",
  "Honor",
  "Hope",
  "Humility",
  "Humor",
  "Imagination",
  "Independence",
  "Influence",
  "Ingenuity",
  "Inspiration",
  "Inspirational",
  "Initiative",
  "Innovation",
  "Insightfulness",
  "Integrity",
  "Intimacy",
  "Intuition",
  "Job Security",
  "Joy",
  "Justice",
  "Kindness",
  "Knowledge",
  "Laughter",
  "Lawfulness",
  "Leadership",
  "Learning",
  "Legacy",
  "Loyalty",
  "Making a difference",
  "Mentorship",
  "Modesty",
  "Mutual Support",
  "Nature",
  "Natural Living",
  "Non-Conformity",
  "Non-Violence",
  "Open-Mindedness",
  "Openness",
  "Optimism",
  "Order",
  "Organization",
  "Originality",
  "Passion",
  "Patience",
  "Peace",
  "Peace of Mind",
  "Perseverance",
  "Persistence",
  "Personal Development",
  "Personal Expression",
  "Personal Fulfillment",
  "Planning",
  "Playfulness",
  "Positive Attitude",
  "Positive Impact",
  "Power",
  "Presence",
  "Pride",
  "Problem-Solving",
  "Professionalism",
  "Profit",
  "Promise-keeping",
  "Prosperity",
  "Protecting Others",
  "Quality",
  "Reciprocity",
  "Recognition",
  "Reliability",
  "Resourcefulness",
  "Respect",
  "Responsibility",
  "Restraint",
  "Righteousness",
  "Risk-taking",
  "Romance",
  "Self-Discipline",
  "Self-Expression",
  "Self-Love",
  "Self-Motivation",
  "Self-Preservation",
  "Self-Respect",
  "Selflessness",
  "Service  ",
  "Service to Others",
  "Simplicity",
  "Sincerity",
  "Social Justice",
  "Spirituality",
  "Spontaneity",
  "Sportsmanship",
  "Stability",
  "Stewardship",
  "Strength",
  "Success",
  "Sustainability",
  "Sweetness",
  "Teamwork",
  "Thoughtfulness",
  "Thrift",
  "Tidiness",
  "Timeliness",
  "Tolerance",
  "Tradition",
  "Transparency",
  "Travel",
  "Truth",
  "Trust",
  "Trust Your Gut",
  "Understanding",
  "Uniqueness",
  "Vivaciousness",
  "Vision",
  "Vulnerability",
  "Warmth",
  "Wealth",
  "Well-being",
  "Wellness",
  "Wholeheartedness",
  "Wisdom",
  "Wit",
]
