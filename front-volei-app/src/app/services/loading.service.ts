import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingList: string[] = []; 
  isLoading = false;

  constructor() { }

  showLoading(method: string) { 
    if (!this.loadingList.includes(method)) { 
      this.loadingList.push(method); 
    } 
    this.isLoading = this.loadingList.length > 0; 
  }

  hideLoading(method: string) { 
    const index = this.loadingList.indexOf(method); 
    if (index !== -1) { 
      this.loadingList.splice(index, 1); 
    } 
    
    if(this.loadingList.length <= 0) {
      this.hideLoadingElement();
    }
  } 

  async hideLoadingElement() {    
    const loadingElement = document.getElementById('overlay');      
    if(loadingElement) {
      loadingElement.style.opacity = '0';
    }
    
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);        
  }
}
