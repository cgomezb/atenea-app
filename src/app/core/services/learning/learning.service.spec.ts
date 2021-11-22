import { TestBed } from '@angular/core/testing';
import { CreateLearningResponse, DeleteLearningResponse, Learning, LearningParameters, LearningQueryParameters, LearningResponse, LearningStatus } from '@core/core.model';
import { LearningService, BackEndService } from '@core/services';
import { learnings } from '@core/services/learning/learning.data';
import { LearningStore } from '@features/learning/store/learning.store';
import { of } from 'rxjs';

describe('LearningService', () => {
  let service: LearningService;
  let store: LearningStore;
  let learningClient: BackEndService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LearningStore,
          useValue: {
            update: jest.fn(),
            setLoading: jest.fn()
          }
        },
        {
          provide: BackEndService,
          useValue: {
            createLearning: jest.fn(),
            deleteLearning: jest.fn(),
            getLearnings: jest.fn()
          }
        }
      ]
    });

    service = TestBed.inject(LearningService);
    store = TestBed.inject(LearningStore);
    learningClient = TestBed.inject(BackEndService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should set parameters', () => {
    service.getLearnings = jest.fn();
    const learningQueryParameters: LearningParameters = {
      query: '',
      page: {
        page: 1,
        offset: 0,
        count: 10
      }
    };

    service.setParameters(learningQueryParameters);

    expect(store.update).toHaveBeenCalledWith({ ...learningQueryParameters });
    expect(service.getLearnings).toHaveBeenCalledWith({ ...learningQueryParameters });
  });

  it('should create a learning', done => {
    const newLearning: Learning = {
      name: 'Javascript',
      status: LearningStatus.unarchive
    };

    const createLearningResponse: CreateLearningResponse = {
      learning: {
        id: 'c0e88373-9d31-49e9-8d68-ab656fe4f83f',
        ...newLearning
      }
    };

    const learningQueryParameters: LearningQueryParameters = {
      query: '',
      page: '1',
      offset: '0',
      count: '10'
    };

    const learningResponse: LearningResponse = {
      learnings: [createLearningResponse.learning],
      totalCount: learnings.length
    }

    learningClient.createLearning = jest.fn().mockReturnValue(of(createLearningResponse));
    learningClient.getLearnings = jest.fn().mockReturnValue(of(learningResponse));
    
    service.createLearning(newLearning)
      .subscribe(() => {
        expect(store.setLoading).toHaveBeenCalledWith(true);
        expect(learningClient.getLearnings).toHaveBeenCalledWith(learningQueryParameters);
        expect(store.update).toHaveBeenCalledWith({ ...learningResponse });
        expect(store.setLoading).toHaveBeenCalledWith(false);
        done();
      });
  });

  it('should delete a learning', done => {
    const learningId = 'c0e88373-9d31-49e9-8d68-ab656fe4f83f';
    const deleteLearningResponse: DeleteLearningResponse = { learningId };
    const learningQueryParameters = {
      query: '',
      page: '1',
      offset: '0',
      count: '10'
    };

    const learningResponse: LearningResponse = {
      learnings: [],
      totalCount: learnings.length
    }

    learningClient.deleteLearning = jest.fn().mockReturnValue(of(deleteLearningResponse));
    learningClient.getLearnings = jest.fn().mockReturnValue(of(learningResponse));
    
    service.deleteLearning(learningId)
      .subscribe(() => {
        expect(store.setLoading).toHaveBeenCalledWith(true);
        expect(learningClient.getLearnings).toHaveBeenCalledWith(learningQueryParameters);
        expect(store.update).toHaveBeenCalledWith({ ...learningResponse });
        expect(store.setLoading).toHaveBeenCalledWith(false);
        done();
      });
  });
});
